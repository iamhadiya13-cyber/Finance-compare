import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { slugify } from "@/lib/utils";
import { mdxComponents } from "@/components/mdx/mdx-components";

const blogDirectory = path.join(process.cwd(), "content", "blog");
const preferredSlugOrder = [
  "how-much-personal-loan-can-i-get-based-on-my-salary-india",
  "personal-loan-on-30000-salary-india",
  "personal-loan-on-50000-salary-india",
  "personal-loan-on-25000-salary-india",
  "how-credit-score-affects-personal-loan-amount-india",
];

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  slug: string;
  category?: string;
  excerpt?: string;
};

export type BlogPostMeta = BlogFrontmatter & {
  readingTime: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type FaqItem = {
  question: string;
  answer: string;
};

function normalizeLineEndings(source: string) {
  return source.replace(/\r\n/g, "\n");
}

function getAllFilePaths() {
  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(blogDirectory, file));
}

function extractTableOfContents(source: string): TocItem[] {
  return normalizeLineEndings(source)
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s/, "").trim();

      return {
        id: slugify(text),
        text,
        level,
      } satisfies TocItem;
    });
}

function extractFaqSection(source: string) {
  const normalized = normalizeLineEndings(source);
  const lines = normalized.split("\n");
  const faqStart = lines.findIndex((line) => line.trim() === "## FAQ");

  if (faqStart === -1) {
    return { content: normalized, faqItems: [] as FaqItem[] };
  }

  let faqEnd = lines.length;
  for (let index = faqStart + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith("## ")) {
      faqEnd = index;
      break;
    }
  }

  const faqLines = lines.slice(faqStart + 1, faqEnd);
  const faqItems: FaqItem[] = [];
  let currentQuestion = "";
  let answerLines: string[] = [];

  const pushCurrent = () => {
    if (!currentQuestion) {
      return;
    }

    const answer = answerLines.join("\n").trim();
    if (answer) {
      faqItems.push({ question: currentQuestion, answer });
    }
  };

  for (const line of faqLines) {
    if (line.startsWith("### ")) {
      pushCurrent();
      currentQuestion = line.replace(/^###\s/, "").trim();
      answerLines = [];
      continue;
    }

    answerLines.push(line);
  }

  pushCurrent();

  const beforeFaq = lines.slice(0, faqStart).join("\n").trimEnd();
  const afterFaq = lines.slice(faqEnd).join("\n").trimStart();
  const content = [beforeFaq, afterFaq].filter(Boolean).join("\n\n");

  return { content, faqItems };
}

function insertMiniComparisonTable(source: string) {
  if (source.includes("<MiniLoanComparisonTable />")) {
    return source;
  }

  const lines = normalizeLineEndings(source).split("\n");
  const quickAnswerStart = lines.findIndex(
    (line) => line.trim() === "## Quick Answer"
  );

  if (quickAnswerStart === -1) {
    return source;
  }

  let insertAt = lines.length;
  for (let index = quickAnswerStart + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith("## ")) {
      insertAt = index;
      break;
    }
  }

  const before = lines.slice(0, insertAt).join("\n").trimEnd();
  const after = lines.slice(insertAt).join("\n").trimStart();

  return [before, "<MiniLoanComparisonTable />", after]
    .filter(Boolean)
    .join("\n\n");
}

function getPreferredOrder(slug: string) {
  const index = preferredSlugOrder.indexOf(slug);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllFilePaths()
    .map((filePath) => {
      const raw = fs.readFileSync(filePath, "utf8");
      const normalized = normalizeLineEndings(raw);
      const { data, content } = matter(normalized);
      const frontmatter = data as BlogFrontmatter;

      return {
        ...frontmatter,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => {
      const dateDiff = +new Date(b.date) - +new Date(a.date);
      if (dateDiff !== 0) {
        return dateDiff;
      }

      return getPreferredOrder(a.slug) - getPreferredOrder(b.slug);
    });
}

export function getLatestPosts(limit = 3) {
  return getAllPosts().slice(0, limit);
}

export function getPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const normalized = normalizeLineEndings(raw);
  const { data, content: sourceContent } = matter(normalized);
  const frontmatter = data as BlogFrontmatter;
  const toc = extractTableOfContents(sourceContent);
  const { content: contentWithoutFaq, faqItems } = extractFaqSection(sourceContent);
  const content = insertMiniComparisonTable(contentWithoutFaq);
  const stats = readingTime(sourceContent);

  const compiled = await compileMDX<BlogFrontmatter>({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["anchor-link"],
              },
            },
          ],
        ],
      },
    },
  });

  return {
    frontmatter,
    toc,
    faqItems,
    readingTime: stats.text,
    content: compiled.content,
  };
}

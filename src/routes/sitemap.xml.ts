import fs from 'fs';
import path from 'path';
import frontmatter from 'front-matter';
import { base } from '$app/paths';
import { create } from 'xmlbuilder2';

function getPosts(filePath: string) {
	const posts = fs
		.readdirSync(filePath)
		.filter((fileName) => !fs.lstatSync(path.resolve(filePath, fileName)).isDirectory())
		.map((fileName) => {
			const post = fs.readFileSync(path.resolve(filePath, fileName), 'utf-8');

			const { attributes } = frontmatter(post);

			return attributes;
		});

	return posts;
}

export async function get() {
	const posts = getPosts('./posts');

	let xml = create({ version: '1.0', encoding: 'utf-8' }).ele('urlset', {
		xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
		'xmlns:xhtml': 'http://www.w3.org/1999/xhtml'
	});
	if (Array.isArray(posts)) {
		posts.forEach((post) => {
			xml
				.ele('url')
				.ele('loc')
				.txt(`${base}/${post.slug}`)
				.up()
				.ele('lastmod')
				.txt(post.updatedAt)
				.up()
				.ele('changefreq')
				.txt(`daily`)
				.up();
		});
	}
	xml
		.ele('url')
		.ele('loc')
		.txt(`${base}/`)
		.up()
		.ele('lastmod')
		.txt(String(new Date()))
		.up()
		.ele('changefreq')
		.txt(`daily`)
		.up();
	let sitemap = xml.end({ prettyPrint: true });

	return {
		status: 200,
		body: sitemap
	};
}

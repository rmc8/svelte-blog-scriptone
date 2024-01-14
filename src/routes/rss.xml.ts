import fs from 'fs';
import path from 'path';
import frontmatter from 'front-matter';
import { create } from 'xmlbuilder2';

let basePath = 'https://mekos.site';
let today = new Date().toUTCString();

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

	let xml = create({ version: '1.0', encoding: 'utf-8' })
		.ele('rss', {
			'xmlns:atom': 'http://www.w3.org/2005/Atom',
			'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
			'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
			version: '2.0'
		})
		.ele('channel')
		.ele('title')
		.txt('Signpost by meko')
		.up()
		.ele('link')
		.txt(basePath + '/')
		.up()
		.ele('language')
		.txt('ja')
		.up()
		.ele('copyright')
		.txt('Copyright 2020-2021 meko')
		.up()
		.ele('description')
		.txt('engineer blog')
		.up()
		.ele('lastBuildDate')
		.txt(today)
		.up()
		.ele('docs')
		.txt('https://validator.w3.org/feed/docs/rss2.html')
		.up()
		.ele('atom:link', { href: `${basePath}/feed.xml`, rel: 'self', type: 'application/rss+xml' })
		.up();
	if (Array.isArray(posts)) {
		posts.forEach((post) => {
			xml
				.ele('item')
				.ele('title')
				.txt(`${post.title}`)
				.up()
				.ele('dc:creator')
				.txt(`${post.author}`)
				.up()
				.ele('link')
				.txt(`${basePath}/${post.slug}/`)
				.up()
				.ele('guid', { isPermaLink: 'true' })
				.txt(`${basePath}/${post.slug}/`)
				.up()
				.ele('pubDate')
				.txt(new Date(post.updatedAt).toUTCString())
				.up()
				.ele('enclosure', { url: `${basePath}/${post.thumbnail}`, length: 0, type: 'image/png' })
				.up()
				.ele('description')
				.txt(`<![CDATA[${post.description}<img src="${basePath}/${post.thumbnail}">]]>`)
				.up();
		});
	}
	let rss = xml.end({ prettyPrint: true });

	return {
		status: 200,
		body: rss
	};
}

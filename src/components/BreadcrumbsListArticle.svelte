<script lang="ts">
	import type { Blog } from '$lib/microcms';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import Home from 'svelte-material-icons/Home.svelte';
	import FolderOutline from 'svelte-material-icons/FolderOutline.svelte';
	import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';

	export let blog: Blog;
</script>

<nav aria-label="パンくずリスト" class="text-sm breadcrumbs mb-2 w-full">
	<ol class="list-none p-0 flex flex-wrap items-center w-full bg-white rounded-md pb-8">
		<li class="flex items-center">
			<a
				href="/"
				class="text-[#0aadb9] hover:text-[#088c96] transition duration-300 ease-in-out flex items-center"
			>
				<Home size="1.2em" />
				<span class="ml-1">Home</span>
			</a>
		</li>
		<li class="flex items-center">
			<ChevronRight size="1.1em" class="text-gray-400" />
		</li>
		<li class="flex items-center">
			<a
				href="/category/{blog.category.id}/p/1"
				class="text-[#0aadb9] hover:text-[#088c96] transition duration-300 ease-in-out flex items-center"
			>
				<FolderOutline size="1.2em" />
				<span class="ml-1">{blog.category.name}</span>
			</a>
		</li>
		<li class="flex items-center">
			<ChevronRight size="1.1em" class="text-gray-400" />
		</li>
		<li class="flex items-center flex-1">
			<span class="text-gray-700 flex items-center truncate">
				<FileDocumentOutline size="1.2em" />
				<span class="ml-1 truncate">{blog.title}</span>
			</span>
		</li>
	</ol>
</nav>

<style lang="postcss">
	.breadcrumbs ol {
		@apply transition-all duration-300 ease-in-out;
	}
	.breadcrumbs a {
		@apply transition-all duration-300 ease-in-out;
	}
	.breadcrumbs a:hover {
		@apply underline;
	}

	ol {
		line-height: 2.2em;
	}
	li {
		margin: 0;
		padding-left: 0px;
		padding-right: 8px;
	}
</style>

<script lang="ts">
	import type { Blog } from '$lib/microcms/microcms/microcms';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';
	import Home from 'svelte-material-icons/Home.svelte';
	import FolderOutline from 'svelte-material-icons/FolderOutline.svelte';
	import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';

	interface Props {
		blog: Blog;
	}

	let { blog }: Props = $props();
</script>

<nav aria-label="パンくずリスト" class="text-sm breadcrumbs mb-2 w-full overflow-x-auto scrollbar-hide">
	<ol class="list-none p-0 flex items-center w-max rounded-md mb-8 whitespace-nowrap">
		<li class="flex-shrink-0 flex items-center">
			<a
				href="/"
				class="text-[--accent-color] hover:text-[#088c96] transition duration-300 ease-in-out flex items-center"
			>
				<Home size="1.2em" />
				<span class="ml-1">Home</span>
			</a>
		</li>
		<li class="flex-shrink-0 flex items-center">
			<ChevronRight size="1.1em" class="text-gray-400 mx-1" />
		</li>
		<li class="flex-shrink-0 flex items-center">
			<a
				href="/category/{blog.category.id}/1"
				class="text-[--accent-color] hover:text-[--accent-color-dark] transition duration-300 ease-in-out flex items-center"
			>
				<FolderOutline size="1.2em" />
				<span class="ml-1 truncate max-w-[100px]">{blog.category.name}</span>
			</a>
		</li>
		<li class="flex-shrink-0 flex items-center">
			<ChevronRight size="1.1em" class="text-gray-400 mx-1" />
		</li>
		<li class="flex-shrink-0 flex items-center">
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
		padding-right: 6px;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
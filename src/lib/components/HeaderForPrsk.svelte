[--bg-main-color]
<header>
	<nav class="py-3 fixed top-0 left-0 right-0 bg-[--bg-main-color] shadow-md z-50">
		<ul class="flex justify-start items-center h-6 pl-2">
			<li class="w-22 mx-1 list-none">
				<a
					href="/project_sekai"
					class="text-lg px-4 py-2 rounded-md transition duration-500 ease-in-out text-black hover:bg-[--accent-color-light] hover:text-white"
				>
					Profile
				</a>
			</li>
			<li class="w-22 mx-1 list-none">
				<a
					href="/project_sekai#tools"
					class="text-lg px-4 py-2 rounded-md transition duration-500 ease-in-out text-black hover:bg-[--accent-color-light] hover:text-white"
				>
					Tools
				</a>
			</li>
			<li class="w-22 mx-1 list-none">
				<a
					href="/"
					class="text-lg px-4 py-2 rounded-md transition duration-500 ease-in-out text-black hover:bg-[--accent-color-light] hover:text-white"
				>
					Home
				</a>
			</li>
		</ul>
	</nav>
	<div id="logo_container" class="flex justify-center w-full">
		<h1 class="border-0 text-center w-full">
			<a href="/project_sekai" id="logo_link" class="block mt-24">
				<img
					id="logo"
					alt="Scriptone"
					width="300"
					height="56"
					src="/logo/scriptone_header.webp"
					class="w-4/5 h-auto max-w-[300px] max-h-[56px] block mx-auto"
				/>
			</a>
		</h1>
	</div>
</header>

<style>
	nav ul li a {
		font-size: 18px;
		padding: 8px 16px;
		border-radius: 5px;
		transition: all 0.5s ease;
		font-weight: 500;
	}
</style>

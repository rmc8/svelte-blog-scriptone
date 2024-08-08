<header>
	<nav class="py-3 fixed top-0 left-0 right-0 bg-[--bg-main-color] custom-shadow z-50">
		<ul class="flex justify-start items-center h-6 pl-2">
			<li class="w-22 mx-1 list-none">
				<a
					href="/diary"
					class="nav-link"
					>Home</a
				>
			</li>
			<li class="w-22 mx-1 list-none">
				<a
					href="/"
					class="nav-link"
					>Scriptone</a
				>
			</li>
			<li class="w-22 mx-1 list-none">
				<a
					href="/about"
					class="nav-link"
					>About</a
				>
			</li>
		</ul>
	</nav>
	<div id="logo_container" class="flex justify-center w-full">
		<h1 class="border-0 text-center w-full">
			<a href="/" id="logo_link" class="block mt-24">
				<img
					id="logo"
					alt="Scriptone"
					width="360"
					height="67"
					src="/logo/scriptone_header.webp"
					class="w-4/5 h-auto max-w-[360px] max-h-[67px] block mx-auto"
				/>
			</a>
		</h1>
	</div>
</header>

<style>
	.nav-link {
		font-size: 18px;
		padding: 8px 16px;
		border-radius: 5px;
		transition: all 0.5s ease;
		font-weight: 500;
		color: black;
	}

	.nav-link:hover {
		color: white;
		background-color: var(--accent-color-light);
	}

	.custom-shadow {
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
</style>
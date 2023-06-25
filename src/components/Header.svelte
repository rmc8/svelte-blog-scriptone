<header>
	<nav>
		<ul>
			<li><a href="http://localhost:5173">Home</a></li>
			<li><a href="http://localhost:5173/about">About</a></li>
		</ul>
	</nav>
	<div class="container">
		<h1>
			<a href="http://localhost:5173" id="logo" />
		</h1>
	</div>
</header>

<style>
	header h1 {
		border: 0px;
	}

	#logo {
		width: auto;
		max-height: 240px;
		min-height: 132px;
		display: block;
		margin-top: 80px;
	}
	nav {
		display: block;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	nav ul {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 24px;
	}

	nav ul li a {
		font-size: 18px;
		padding: 8px 16px;
		border-radius: 5px;
		transition: background-color 0.2s ease-in-out;
		color: var(--text-color);
	}

	nav ul li {
		margin-left: 4px;
		margin-right: 4px;
		list-style: none;
	}

	nav ul li a:hover {
		background-color: var(--accent-color-light);
		color: #fff;
		transition: all 0.5s ease;
	}
</style>

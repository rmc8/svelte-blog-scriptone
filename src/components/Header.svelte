<header>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/about">About</a></li>
		</ul>
	</nav>
	<div id="logo_container">
		<h1>
			<a href="/" id="logo_link"><img id="logo" src="/logo/scriptone_header.png" /></a>
		</h1>
	</div>
</header>

<style>
	header h1 {
		border: 0px;
		text-align: center;
		width: 100%;
	}

	#logo_container {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	#logo_link {
		display: block;
		margin-top: 96px;
	}

	#logo {
		width: 90%;
		max-width: 1250px;
		max-height: 233px;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
	@media screen and (min-width: 600px) {
		#logo {
			width: 560px;
		}
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

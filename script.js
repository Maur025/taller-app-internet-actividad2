document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector(".site-header");
	const navToggle = document.querySelector(".nav-toggle");
	const navLinks = Array.from(document.querySelectorAll(".nav-list a"));
	const sectionAnchors = navLinks
		.map((link) => link.getAttribute("href"))
		.filter((href) => href && href.startsWith("#"));
	const sections = sectionAnchors.map((href) => document.querySelector(href)).filter(Boolean);

	const setActiveLink = (id) => {
		navLinks.forEach((link) => {
			const isActive = link.getAttribute("href") === `#${id}`;
			if (isActive) {
				link.setAttribute("aria-current", "page");
			} else {
				link.removeAttribute("aria-current");
			}
		});
	};

	if (navToggle && header) {
		navToggle.addEventListener("click", () => {
			const expanded = navToggle.getAttribute("aria-expanded") === "true";
			navToggle.setAttribute("aria-expanded", String(!expanded));
			header.classList.toggle("nav-open", !expanded);
		});

		navLinks.forEach((link) => {
			link.addEventListener("click", () => {
				navToggle.setAttribute("aria-expanded", "false");
				header.classList.remove("nav-open");
			});
		});
	}

	const updateHeaderOnScroll = () => {
		if (!header) {
			return;
		}
		header.classList.toggle("is-scrolled", window.scrollY > 12);
	};

	updateHeaderOnScroll();
	window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });

	if ("IntersectionObserver" in window && sections.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveLink(entry.target.id);
					}
				});
			},
			{
				rootMargin: "-45% 0px -45% 0px",
				threshold: 0,
			},
		);

		sections.forEach((section) => observer.observe(section));
		setActiveLink(sections[0].id);
	}

	let cantidadProyectos = 120;
	const contadorProyectos = document.getElementById("proyectos");

	if (contadorProyectos) {
		setInterval(() => {
			cantidadProyectos++;
			contadorProyectos.textContent = "+" + cantidadProyectos;
		}, 4000);
	}
});

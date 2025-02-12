export default defineNuxtPlugin(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated"); // Add animation class
          entry.target.style.opacity = "1"; // Make it visible
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".animate__animated").forEach((el) => {
    const animationClass = [...el.classList].find((cls) =>
      cls.startsWith("animate__")
    );
    el.classList.remove("animate__animated", animationClass); // Remove animation classes
    el.style.opacity = "0"; // Hide initially
    el.dataset.animate = animationClass; // Store animation name
    observer.observe(el);
  });
});

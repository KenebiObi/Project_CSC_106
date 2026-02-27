
// Custom JavaScript for loading header and footer
async function loadHTML(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`${file} not found`);
    el.innerHTML = await res.text();
  } catch (e) {
    console.error(e);
    el.innerHTML = "<!-- include failed -->";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "inc/header.html");
  loadHTML("footer", "inc/footer.html");
});

// Custom JavaScript for product filtering

        function filterItems(category) {
            const items = document.querySelectorAll('.product-item');
            const buttons = {
                all: document.getElementById('filter-all'),
                men: document.getElementById('filter-men'),
                women: document.getElementById('filter-women')
            };

            // Reset buttons
            Object.values(buttons).forEach(btn => {
                btn.classList.remove('filter-active');
                btn.classList.add('text-slate-400');
            });

            // Set active button
            buttons[category].classList.add('filter-active');
            buttons[category].classList.remove('text-slate-400');

            // Filter logic
            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

  // Custom JavaScript for dynamic greeting
            document.addEventListener('DOMContentLoaded', function () {
                const greetingElement = document.getElementById('greeting');
                const hour = new Date().getHours();
                let greetingText = "Good Evening";

                if (hour < 12) {
                    greetingText = "Good Morning";
                } else if (hour < 18) {
                    greetingText = "Good Afternoon";
                }

                greetingElement.textContent = greetingText + ". Experience Excellence.";
            });


  // Custom JavaScript for booking form validation
        document.getElementById('bookingForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = document.getElementById('email');
            const dateInput = document.getElementById('date');
            const emailError = document.getElementById('emailError');
            const dateError = document.getElementById('dateError');

            let isValid = true;

            // Email Validation (contains @)
            if (!emailInput.value.includes('@')) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-red-500');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-red-500');
            }

            // Date Validation (not in past)
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                dateError.classList.remove('hidden');
                dateInput.classList.add('border-red-500');
                isValid = false;
            } else {
                dateError.classList.add('hidden');
                dateInput.classList.remove('border-red-500');
            }

            if (isValid) {
                // Success logic
                document.getElementById('bookingForm').classList.add('hidden');
                document.getElementById('successState').classList.remove('hidden');
            }
        });

        // Set min date for the date picker to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').setAttribute('min', today);
  

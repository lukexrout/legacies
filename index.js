document.addEventListener('DOMContentLoaded', () => {
    // contact_fade_anim
    function checkElementLocation() {
        var windowHeight = window.innerHeight;
        var bottomOfWindow = window.scrollY + windowHeight;
    
        var elements = document.querySelectorAll('.scroll_fade_in');
    
        elements.forEach(function (element) {
            // Check if the element has already been animated
            if (!element.classList.contains('fade-in') && !element.dataset.animated) {
                var rect = element.getBoundingClientRect();
                var bottomOfObject = rect.top + rect.height;
    
                // If element is in viewport, add the 'fade-in' class
                if (bottomOfWindow > bottomOfObject) {
                    element.classList.add('fade-in');
                    // Add a custom data attribute to mark the element as animated
                    element.dataset.animated = true;
                }
            }
        });
    }
    
    // If in viewport, show the animation
    checkElementLocation();
    
    // Attach scroll event listener
    window.addEventListener('scroll', function() {
        checkElementLocation();
    });

    // contact_dropdown_select
    const dropdwon_arr = [
        'General Inquiry',
        'Property Availability',
        'Schedule Manager Consultation',
        'Other'
    ]
    const dropdown_value = document.getElementById('dropdown_select_value')
    const dropdown = document.getElementById('dropdown')
    const dropdown_container = document.getElementById('dropdown_container')

    dropdown.addEventListener('mouseenter', () => {
        dropdown_container.style.visibility = 'visible'
    })

    dropdown.addEventListener('mouseleave', () => {
        dropdown_container.style.visibility = 'hidden'
    })

    const change_drop = (index) => {
        dropdown_value.innerHTML = dropdwon_arr[index]
        dropdown_container.style.visibility = 'hidden'
    }
    document.getElementById('dropdown_select_general_inquiry').addEventListener('click', () => {change_drop(0)})
    document.getElementById('dropdown_select_property_availability').addEventListener('click', () => {change_drop(1)})
    document.getElementById('dropdown_select_schedule_manager_consultation').addEventListener('click', () => {change_drop(2)})
    document.getElementById('dropdown_select_other').addEventListener('click', () => {change_drop(3)})

    // contact_submit
    document.getElementById('contact_submit').addEventListener('click', () => {
        let first_name = document.getElementById('contact_first_name')
        let last_name = document.getElementById('contact_last_name')
        let email = document.getElementById('contact_email')
        let phone = document.getElementById('contact_phone')
        let type = document.getElementById('dropdown_select_value')
        let reason = document.getElementById('contact_reason')
        let error = document.getElementById('contact_error')

        if (first_name.value && 
            last_name.value && 
            email.value && 
            phone.value && 
            type.innerHTML != "Select Reason For Inquiry" && 
            reason.value
            ) {
            const url = "http://localhost:4444/contact"
            fetch(url, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "first_name": first_name.value,
                    "last_name": last_name.value,
                    "email": email.value,
                    "phone": phone.value,
                    "type": type.innerHTML,
                    "reason": reason.value
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.log([first_name, last_name, email, phone, type, reason])
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                first_name.value = ''
                last_name.value = ''
                email.value = ''
                phone.value = ''
                type.innerHTML = 'Select Reason For Inquiry'
                reason.value = ''
                {error.style.visibility == 'visible' ? error.style.visibility = 'hidden' : null}
            })
            .catch(error => console.error('Error:', error))
        } else {
            error.style.visibility = 'visible'
        }
    })
})

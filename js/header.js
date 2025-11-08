document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('site-header');
    if (!headerContainer) {
        return;
    }

    fetch('header.html', { cache: 'no-cache' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then((markup) => {
            headerContainer.innerHTML = markup;
            highlightActiveNavLink();
            document.dispatchEvent(new CustomEvent('headerLoaded'));
        })
        .catch((error) => {
            console.error(error);
        });
});

function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navMap = {
        'index.html': null,
        'menu.html': 'menu',
        'muffin.html': 'menu',
        'order.html': 'order',
        'diary.html': 'diary'
    };

    const activeKey = navMap[currentPath];
    if (!activeKey) {
        return;
    }

    const link = document.querySelector(`.nav-link[data-nav="${activeKey}"]`);
    link?.classList.add('active');
}


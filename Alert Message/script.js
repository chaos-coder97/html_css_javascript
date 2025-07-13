function showNotification(type, title, message, icon) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');

    notification.innerHTML = `
    <button class="close-button" onclick="removeNotification(this.parentElement)" aria-label="Close notification">×</button>
    <div class="notification-header">
      <div class="notification-icon">${icon}</div>
      <div class="notification-title">${title}</div>
    </div>
    <div class="notification-message">${message}</div>
  `;

    // Calculate stacking position
    const existing = document.querySelectorAll('.notification');
    const topOffset = 30 + existing.length * 140;
    notification.style.top = `${topOffset}px`;

    // Append to body
    document.body.appendChild(notification);

    // Trigger appearance animation
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    if (!notification) return;
    notification.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => {
        notification?.remove();
        adjustRemainingNotifications();
    }, 300);
}

// Recalculate position after one is removed
function adjustRemainingNotifications() {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach((n, i) => {
        const offset = 30 + i * 140;
        n.style.top = `${offset}px`;
    });
}

// Button Trigger Functions
function showSuccessNotification() {
    showNotification('success', 'Success', 'All systems are operating normally.', '✦');
}

function showWarningNotification() {
    showNotification('warning', 'Warning', 'Unusual activity detected. Please check settings.', '⚠');
}

function showErrorNotification() {
    showNotification('error', 'Error', 'A critical system error occurred. Please reboot.', '✖');
}

function showInfoNotification() {
    showNotification('info', 'Info', 'System update available. Click for more info.', 'ℹ');
}

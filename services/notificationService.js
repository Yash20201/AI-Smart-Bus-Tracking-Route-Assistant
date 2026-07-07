const Notification = require('../models/Notification');

exports.createNotification = async (userId, title, message) => {
    return Notification.create({ user: userId, title, message });
};

exports.getUserNotifications = async (userId) => {
    return Notification.find({ user: userId }).sort({ createdAt: -1 });
};

exports.markAsRead = async (notificationId) => {
    return Notification.findByIdAndUpdate(
        notificationId,
        { isRead: true },
        { new: true }
    );
};

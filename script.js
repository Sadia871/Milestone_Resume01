document.addEventListener('DOMContentLoaded', function () {
    var skillItems = document.querySelectorAll('.skill-item');
    var courseItems = document.querySelectorAll('.course-item');
    skillItems.forEach(function (item, index) {
        item.style.setProperty('--i', index + 1);
    });
    courseItems.forEach(function (item, index) {
        item.style.setProperty('--i', index + 1);
    });
});
function toggleSection(sectionId) {
    var content = document.getElementById(sectionId);
    if (content) {
        if (content.classList.contains('visible')) {
            content.classList.remove('visible');
            content.classList.add('hidden');
        }
        else {
            content.classList.remove('hidden');
            content.classList.add('visible');
        }
    }
}

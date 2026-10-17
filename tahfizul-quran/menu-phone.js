/* Phone only: tapping the nameplate opens the menu (the hamburger button is hidden on phones). */
(function () {
  var phone = window.matchMedia('(max-width: 900px)');
  document.addEventListener('click', function (e) {
    var plate = e.target.closest && e.target.closest('.logo-nameplate');
    if (!plate || !phone.matches) return;
    e.preventDefault();
    var sticky = plate.closest('#stickyCloneHeader');
    var group = document.getElementById(sticky ? 'navGroupsClone' : 'navGroups');
    if (group) group.classList.toggle('open');
  });
})();

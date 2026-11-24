function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = dpcument.getElementbyId("content");
    const button = document.querySelector(".collapse")


    sidebar.classList.toggle("collapsed");
    content.classList.toggle("expanded");


    button.innerHTML = sidebar.classList.contains("collapsed")
        ? "&rarr;"
        : "&larr;";

}
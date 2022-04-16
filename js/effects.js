function run() {
    $area = $("#title-text-container")
    var msgs = [
        "Stop that!",
        "Why are you following me?!",
        "Go away!",
        "Don't touch me!",
        "Don't you have anything better to do?!"
    ];

    var randX = Math.floor(Math.random() * ($area.width() - 100));
    var randY = Math.floor(Math.random() * ($area.height() - 100));
    var index = Math.floor(Math.random() * msgs.length);
    var msg = msgs[index];
    $(this).html(msg);
    $(this).stop().animate({"left": randX + "px", "top": randY + "px"});
}

$(document).ready(function() {
    $(".runner").on("mouseenter", run);
    $(".animated-title-borders")
        .css("max-width", "100%")   // Trigger CSS animation to expand width
        .css("max-height", "20%");  // Trigger CSS animation to expand height
    $(".animated-title-box")
        .css("opacity", 1);         // Trigger CSS animation to fade in text
    $(window).resize(function() {
        // Autoresize the title text to make it as big as possible
        let height = $(".animated-title").height();
        $(".animated-title").css({
            "font-size": height + "px",
            "line-height": height + "px"
        })
    }).trigger("resize");
});
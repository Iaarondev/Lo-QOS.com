
// Lo-QOS Protocol Hybrid Navigation with Toggle
document.addEventListener("DOMContentLoaded", () => {
    const protocolLinks = document.querySelectorAll("[data-protocol-link]");
    const toggleSwitch = document.getElementById("protocol-toggle");
    let protocolEnabled = true;

    // Update protocolEnabled based on toggle
    toggleSwitch.addEventListener("change", () => {
        protocolEnabled = toggleSwitch.checked;
        console.log(`Protocol navigation is now ${protocolEnabled ? "enabled" : "disabled"}.`);
    });

    protocolLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const protocolPath = link.getAttribute("href");

            if (protocolEnabled && protocolPath.startsWith("loqos://")) {
                console.log(`Navigating via Lo-QOS Protocol: ${protocolPath}`);
                alert(`Lo-QOS Protocol Handler: ${protocolPath}`);
            } else {
                console.log(`Navigating via traditional route: ${protocolPath}`);
                window.location.href = protocolPath.replace("loqos://", "/");
            }
        });
    });
});

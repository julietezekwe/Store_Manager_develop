const scripts =  [
    "js/components/header.js", 
    "js/components/card.js", 
    "js/components/footer.js", 
];
scripts.forEach(script => {
    let imported = document.createElement('script');
    imported.src = document.location.hostname + script;
    document.head.appendChild(imported);
});



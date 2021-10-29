const generateHTML = () =>
`
    <!DOCTYPE html>
    <html lang="en-US">
    
      <head>
        <meta charset="UTF-8">
        <title>TEAM GENERATOR</title>
    
        <!--bootstrap link-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
        <!--link reset css-->
        <link rel="stylesheet" href="assets/css/reset.css" />

        <!--icon kit link-->
        <script src="https://kit.fontawesome.com/4b926c6456.js" crossorigin="anonymous"></script>
    
        <!--link css-->
        <link rel="stylesheet" type="text/css" href="./assets/css/style.css">
      </head>
    
      <body>
    
        <header>
    
        </header>

        <main>
        <div class="container-fluid">
            <div class= "row">
                <div class="col-12" id="content">
                </div>
            </div>
            <script src="./assets/js/script.js"></script>
    </main>
    </body>
</html>
`;

module.exports = generateHTML;


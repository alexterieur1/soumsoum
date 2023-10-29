const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: 'milleetunemerveilles'
})

exports.inscription = (req, res) => {
    con.connect(async (err) => {
        if (err) throw err;
        console.log('connecté !')
        console.log(req.body)
        let idClient = Date.now()
        const hash = await bcrypt.hash(req.body.motDePasse, 8)
        var sql = `INSERT INTO client (idClient, motDePasse, nom, prenom, adresse, codePostale, ville, mail, tel, annee, mois, jours) VALUES ('${idClient}', '${hash}', '${req.body.nom}', '${req.body.prenom}', '${req.body.adresse}', '${req.body.codePostale}', '${req.body.ville}', '${req.body.mail}', '${req.body.tel}', '${req.body.annee}', '${req.body.mois}', '${req.body.jours}')`
        con.query(sql, (err, result, fields) => {
            if (err) {
                return res.status(500).json({ err, message: 'bad request' })
            }
            try {
                let jwtClient = {
                    idClient: idClient,
                    Mail: req.body.mail,
                    token: jwt.sign(
                        {
                            idClient: idClient,
                            mail: req.body.mail
                        },
                        process.env.PHRASECRYPT,
                        { expiresIn: '24h' }
                    )
                }
                req.session.token = jwtClient.token
                return res.status(200).json(req.sessionID)
            }
            catch (err) {
                console.log(err)
                return res.status(400).json({ err })
            }
        })
    })
}

exports.connexion = async (req, res) => {
    con.connect(async (err) => {
        if (err) throw err;
        console.log('connecté !')
        var sql = `SELECT * from client WHERE mail='${req.body.mail}'`
        con.query(sql, async (err, result, fields) => {
            if (err) {
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                const MDP = await bcrypt.compare(req.body.password, result[0].motDepasse)
                if (!MDP) {
                    return res.status(401).json({ message: `error authentification` })
                }
                else {
                    let jwtClient = {
                        idClient: result[0].idClient,
                        Mail: result[0].mail,
                        token: jwt.sign(
                            {
                                idClient: result[0].idClient,
                                mail: result[0].mail
                            },
                            process.env.PHRASECRYPT,
                            { expiresIn: '24h' }
                        )
                    }
                    req.session.token = jwtClient.token
                    //console.log(req.sessionID)
                    //console.log('cookie endessous')
                    //console.log(req.headers.cookie.split('=')[1])
                    //console.log('cookie audessus')
                    return res.status(200).json(/*req.session.token.split('.')[1]*/req.sessionID)
                }
            }
            catch (err) {
                return res.status(400).json({ err })
            }
        })
    })
}

exports.informationClient = async (req, res) => {
    console.log(req.auth.token.mail)
    console.log('information client')
    con.connect(async (err) => {
        if (err) throw err;
        console.log('connecté !')
        var sql = `SELECT nom, prenom, adresse, codePostale, ville, mail, tel, annee, mois, jours, verifier from client WHERE mail='${req.auth.token.mail}'`
        con.query(sql, async (err, result, fields) => {
            if (err) {
                return res.status(500).json({ message: 'bad request' })
            }
            try {
                console.log(result)
                return res.status(200).json(result)
            }
            catch (err) {
                return res.status(400).json({ err })
            }
        })
    })
}

exports.deconnexion = (req, res) => {
    req.session.destroy()
    console.log(req)
    return res.status(200).json()
}

exports.mailVerification = (req, res) => {
    const transporter = nodemailer.createTransport({
        pool: true,
        host: process.env.host,
        port: 465,
        secure: true,
        auth: {
            user: process.env.authUser,
            pass: process.env.authPass,
        },
        tls: {
            rejectUnauthorized: true,
        }
    });

    const mailOptions = {
        from: 'mille et une merveilles <noreply@milleetunemerveilles.com>',
        to: `alexandrerichard45@sfr.fr, alexandre.richard@rcbd.fr`,
        subject: 'nouveau test',
        html: `<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
        xmlns="http://www.w3.org/TR/REC-html40">
      
      <head>
        <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
        <meta name=ProgId content=Word.Document>
        <meta name=Generator content="Microsoft Word 15">
        <meta name=Originator content="Microsoft Word 15">
        <link rel=File-List href="MAIL%20BIENVENUE_fichiers/filelist.xml">
        <link rel=Edit-Time-Data href="MAIL%20BIENVENUE_fichiers/editdata.mso">
        <link rel=themeData href="MAIL%20BIENVENUE_fichiers/themedata.thmx">
        <link rel=colorSchemeMapping href="MAIL%20BIENVENUE_fichiers/colorschememapping.xml">
        <style>
          <!--
          /* Font Definitions */
          @font-face {
            font-family: Helvetica;
            panose-1: 2 11 6 4 2 2 2 2 2 4;
            mso-font-charset: 0;
            mso-generic-font-family: swiss;
            mso-font-pitch: variable;
            mso-font-signature: -536858881 -1073711013 9 0 511 0;
          }
      
          @font-face {
            font-family: "Cambria Math";
            panose-1: 2 4 5 3 5 4 6 3 2 4;
            mso-font-charset: 0;
            mso-generic-font-family: roman;
            mso-font-pitch: variable;
            mso-font-signature: -536869121 1107305727 33554432 0 415 0;
          }
      
          @font-face {
            font-family: Calibri;
            panose-1: 2 15 5 2 2 2 4 3 2 4;
            mso-font-charset: 0;
            mso-generic-font-family: swiss;
            mso-font-pitch: variable;
            mso-font-signature: -469750017 -1040178053 9 0 511 0;
          }
      
          @font-face {
            font-family: Gabriola;
            panose-1: 4 4 6 5 5 16 2 2 13 2;
            mso-font-charset: 0;
            mso-generic-font-family: decorative;
            mso-font-pitch: variable;
            mso-font-signature: -536870161 1342185547 0 0 159 0;
          }
      
          /* Style Definitions */
          p.MsoNormal,
          li.MsoNormal,
          div.MsoNormal {
            mso-style-unhide: no;
            mso-style-qformat: yes;
            mso-style-parent: "";
            margin-top: 0cm;
            margin-right: 0cm;
            margin-bottom: 8.0pt;
            margin-left: 0cm;
            line-height: 106%;
            mso-pagination: widow-orphan;
            font-size: 11.0pt;
            font-family: "Calibri", sans-serif;
            mso-ascii-font-family: Calibri;
            mso-ascii-theme-font: minor-latin;
            mso-fareast-font-family: Calibri;
            mso-fareast-theme-font: minor-latin;
            mso-hansi-font-family: Calibri;
            mso-hansi-theme-font: minor-latin;
            mso-bidi-font-family: "Times New Roman";
            mso-bidi-theme-font: minor-bidi;
            mso-font-kerning: 1.0pt;
            mso-ligatures: standardcontextual;
            mso-fareast-language: EN-US;
          }
      
          h1 {
            mso-style-priority: 9;
            mso-style-unhide: no;
            mso-style-qformat: yes;
            mso-style-link: "Titre 1 Car";
            mso-margin-top-alt: auto;
            margin-right: 0cm;
            mso-margin-bottom-alt: auto;
            margin-left: 0cm;
            mso-pagination: widow-orphan;
            mso-outline-level: 1;
            font-size: 24.0pt;
            font-family: "Times New Roman", serif;
            mso-fareast-font-family: "Times New Roman";
            font-weight: bold;
          }
      
          h4 {
            mso-style-noshow: yes;
            mso-style-priority: 9;
            mso-style-qformat: yes;
            mso-style-link: "Titre 4 Car";
            mso-margin-top-alt: auto;
            margin-right: 0cm;
            mso-margin-bottom-alt: auto;
            margin-left: 0cm;
            mso-pagination: widow-orphan;
            mso-outline-level: 4;
            font-size: 12.0pt;
            font-family: "Times New Roman", serif;
            mso-fareast-font-family: "Times New Roman";
            font-weight: bold;
          }
      
          a:link,
          span.MsoHyperlink {
            mso-style-noshow: yes;
            mso-style-priority: 99;
            color: blue;
            text-decoration: underline;
            text-underline: single;
          }
      
          a:visited,
          span.MsoHyperlinkFollowed {
            mso-style-noshow: yes;
            mso-style-priority: 99;
            color: #954F72;
            mso-themecolor: followedhyperlink;
            text-decoration: underline;
            text-underline: single;
          }
      
          p {
            mso-style-noshow: yes;
            mso-style-priority: 99;
            mso-margin-top-alt: auto;
            margin-right: 0cm;
            mso-margin-bottom-alt: auto;
            margin-left: 0cm;
            mso-pagination: widow-orphan;
            font-size: 12.0pt;
            font-family: "Times New Roman", serif;
            mso-fareast-font-family: "Times New Roman";
          }
      
          span.Titre1Car {
            mso-style-name: "Titre 1 Car";
            mso-style-priority: 9;
            mso-style-unhide: no;
            mso-style-locked: yes;
            mso-style-link: "Titre 1";
            mso-ansi-font-size: 24.0pt;
            mso-bidi-font-size: 24.0pt;
            font-family: "Times New Roman", serif;
            mso-ascii-font-family: "Times New Roman";
            mso-fareast-font-family: "Times New Roman";
            mso-hansi-font-family: "Times New Roman";
            mso-bidi-font-family: "Times New Roman";
            mso-font-kerning: 18.0pt;
            mso-ligatures: none;
            mso-fareast-language: FR;
            font-weight: bold;
          }
      
          span.Titre4Car {
            mso-style-name: "Titre 4 Car";
            mso-style-noshow: yes;
            mso-style-priority: 9;
            mso-style-unhide: no;
            mso-style-locked: yes;
            mso-style-link: "Titre 4";
            mso-ansi-font-size: 12.0pt;
            mso-bidi-font-size: 12.0pt;
            font-family: "Times New Roman", serif;
            mso-ascii-font-family: "Times New Roman";
            mso-fareast-font-family: "Times New Roman";
            mso-hansi-font-family: "Times New Roman";
            mso-bidi-font-family: "Times New Roman";
            mso-font-kerning: 0pt;
            mso-ligatures: none;
            mso-fareast-language: FR;
            font-weight: bold;
          }
      
          p.msonormal0,
          li.msonormal0,
          div.msonormal0 {
            mso-style-name: msonormal;
            mso-style-noshow: yes;
            mso-style-priority: 99;
            mso-style-unhide: no;
            mso-margin-top-alt: auto;
            margin-right: 0cm;
            mso-margin-bottom-alt: auto;
            margin-left: 0cm;
            mso-pagination: widow-orphan;
            font-size: 12.0pt;
            font-family: "Times New Roman", serif;
            mso-fareast-font-family: "Times New Roman";
          }
      
          .MsoChpDefault {
            mso-style-type: export-only;
            mso-default-props: yes;
            font-size: 10.0pt;
            mso-ansi-font-size: 10.0pt;
            mso-bidi-font-size: 10.0pt;
            font-family: "Calibri", sans-serif;
            mso-ascii-font-family: Calibri;
            mso-ascii-theme-font: minor-latin;
            mso-fareast-font-family: Calibri;
            mso-fareast-theme-font: minor-latin;
            mso-hansi-font-family: Calibri;
            mso-hansi-theme-font: minor-latin;
            mso-bidi-font-family: "Times New Roman";
            mso-bidi-theme-font: minor-bidi;
            mso-font-kerning: 0pt;
            mso-ligatures: none;
            mso-fareast-language: EN-US;
          }
      
          @page WordSection1 {
            size: 595.3pt 841.9pt;
            margin: 70.85pt 70.85pt 70.85pt 70.85pt;
            mso-header-margin: 35.4pt;
            mso-footer-margin: 35.4pt;
            mso-paper-source: 0;
          }
      
          div.WordSection1 {
            page: WordSection1;
          }
          -->
        </style>
        <!--[if gte mso 10]>
      <style>
       /* Style Definitions */
       table.MsoNormalTable
          {mso-style-name:"Tableau Normal";
          mso-tstyle-rowband-size:0;
          mso-tstyle-colband-size:0;
          mso-style-noshow:yes;
          mso-style-priority:99;
          mso-style-parent:"";
          mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
          mso-para-margin:0cm;
          mso-pagination:widow-orphan;
          font-size:10.0pt;
          font-family:"Calibri",sans-serif;
          mso-ascii-font-family:Calibri;
          mso-ascii-theme-font:minor-latin;
          mso-hansi-font-family:Calibri;
          mso-hansi-theme-font:minor-latin;
          mso-bidi-font-family:"Times New Roman";
          mso-bidi-theme-font:minor-bidi;
          mso-fareast-language:EN-US;}
      </style>
      <![endif]--><!--[if gte mso 9]><xml>
       <o:shapedefaults v:ext="edit" spidmax="1027"/>
      </xml><![endif]--><!--[if gte mso 9]><xml>
       <o:shapelayout v:ext="edit">
        <o:idmap v:ext="edit" data="1"/>
       </o:shapelayout></xml><![endif]-->
      </head>
      
      <body lang=FR link=blue vlink="#954F72" style='tab-interval:35.4pt;word-wrap:
      break-word'>
      
        <div class=WordSection1>
      
          <table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 width="100%" style='width:100.0%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:
       0cm 0cm 0cm 0cm'>
            <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>
              <td valign=top style='padding:0cm 0cm 0cm 0cm'>
                <table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 width="100%" style='width:100.0%;border-collapse:collapse;mso-yfti-tbllook:1184;
         mso-padding-alt:0cm 0cm 0cm 0cm'>
                  <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>
                    <td style='background:#FBF9F7;padding:37.5pt 13.5pt 0cm 13.5pt'>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center'><span style='color:black;mso-color-alt:windowtext;mso-ligatures:none;mso-no-proof:
          yes'><!--[if gte vml 1]><v:shapetype id="_x0000_t75" coordsize="21600,21600"
           o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe" filled="f"
           stroked="f">
           <v:stroke joinstyle="miter"/>
           <v:formulas>
            <v:f eqn="if lineDrawn pixelLineWidth 0"/>
            <v:f eqn="sum @0 1 0"/>
            <v:f eqn="sum 0 0 @1"/>
            <v:f eqn="prod @2 1 2"/>
            <v:f eqn="prod @3 21600 pixelWidth"/>
            <v:f eqn="prod @3 21600 pixelHeight"/>
            <v:f eqn="sum @0 0 1"/>
            <v:f eqn="prod @6 1 2"/>
            <v:f eqn="prod @7 21600 pixelWidth"/>
            <v:f eqn="sum @8 21600 0"/>
            <v:f eqn="prod @7 21600 pixelHeight"/>
            <v:f eqn="sum @10 21600 0"/>
           </v:formulas>
           <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
           <o:lock v:ext="edit" aspectratio="t"/>
          </v:shapetype><v:shape id="Image_x0020_2078959862" o:spid="_x0000_i1026"
           type="#_x0000_t75" alt="Une image contenant fleur, texte, broderie&#10;&#10;Description g�n�r�e automatiquement"
           style='width:290.4pt;height:260.4pt;visibility:visible;mso-wrap-style:square'>
           <v:imagedata src="MAIL%20BIENVENUE_fichiers/image001.png" o:title="Une image contenant fleur, texte, broderie&#10;&#10;Description g�n�r�e automatiquement"
            croptop="7937f" cropbottom="8391f" cropleft="6123f" cropright="4535f"/>
          </v:shape><![endif]-->
                          <![if !vml]><img width=387 height=347 src="MAIL%20BIENVENUE_fichiers/image002.jpg"
                            alt="Une image contenant fleur, texte, broderie&#10;&#10;Description g�n�r�e automatiquement"
                            v:shapes="Image_x0020_2078959862">
                          <![endif]>
                        </span><b><span style='font-size:24.0pt;line-height:106%;font-family:Gabriola'>
                            <o:p></o:p>
                          </span></b></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center'><span
                          style='font-size:7.0pt;line-height:106%;font-family:Gabriola'>
                          <o:p>&nbsp;</o:p>
                        </span></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center'><b><span style='font-size:24.0pt;line-height:106%;font-family:Gabriola;color:black;
          mso-color-alt:windowtext'>Bienvenue&nbsp;!</span></b><b><span
                            style='font-size:24.0pt;line-height:106%;font-family:Gabriola'>
                            <o:p></o:p>
                          </span></b></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center'><span
                          style='font-size:7.0pt;line-height:106%;font-family:Gabriola'>
                          <o:p>&nbsp;</o:p>
                        </span></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><span style='font-size:16.0pt;font-family:Gabriola;
          mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Courier New";
          color:#222222;letter-spacing:.6pt;mso-font-kerning:0pt;mso-ligatures:none;
          mso-fareast-language:FR'>Nous confirmons la cr�ation de votre compte sur
                          notre site <i>Mille et une Merveilles</i>. Nous sommes heureux de vous
                          compter parmi nous&nbsp;! <o:p></o:p></span></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><!--[if gte vml 1]><v:shape id="Graphique_x0020_6"
           o:spid="_x0000_s1026" type="#_x0000_t75" alt="Fleurs de cerisier contour"
           style='position:absolute;left:0;text-align:left;margin-left:-15.9pt;
           margin-top:12.05pt;width:1in;height:1in;z-index:251658240;visibility:visible;
           mso-wrap-style:square;mso-width-percent:0;mso-height-percent:0;
           mso-wrap-distance-left:9pt;mso-wrap-distance-top:0;
           mso-wrap-distance-right:9pt;mso-wrap-distance-bottom:0;
           mso-position-horizontal:absolute;mso-position-horizontal-relative:text;
           mso-position-vertical:absolute;mso-position-vertical-relative:text;
           mso-width-percent:0;mso-height-percent:0;mso-width-relative:margin;
           mso-height-relative:margin'>
           <v:imagedata src="MAIL%20BIENVENUE_fichiers/image003.png" o:title="Fleurs de cerisier contour"/>
          </v:shape><![endif]-->
                        <![if !vml]><span style='mso-ignore:vglayout;
          position:relative;z-index:251658240;left:-14px;top:166px;width:120px;
          height:286px'><img width=96 height=96 src="MAIL%20BIENVENUE_fichiers/image004.png" alt="Fleurs de cerisier contour"
                            v:shapes="Graphique_x0020_6"></span>
                        <![endif]><span style='font-size:16.0pt;font-family:Gabriola;mso-fareast-font-family:"Times New Roman";
          mso-bidi-font-family:"Courier New";color:#222222;letter-spacing:.6pt;
          mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR'>
                          <o:p>&nbsp;</o:p>
                        </span>
                      </p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><span style='font-size:16.0pt;font-family:Gabriola;
          mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Courier New";
          color:#222222;letter-spacing:.6pt;mso-font-kerning:0pt;mso-ligatures:none;
          mso-fareast-language:FR'>
                          <o:p>&nbsp;</o:p>
                        </span></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><span style='font-size:16.0pt;font-family:Gabriola;
          mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Courier New";
          color:#222222;letter-spacing:.6pt;mso-font-kerning:0pt;mso-ligatures:none;
          mso-fareast-language:FR'>
                          <o:p>&nbsp;</o:p>
                        </span></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><span style='font-size:7.0pt;font-family:Gabriola;
          mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Courier New";
          color:#222222;letter-spacing:.6pt;mso-font-kerning:0pt;mso-ligatures:none;
          mso-fareast-language:FR'>
                          <o:p>&nbsp;</o:p>
                        </span></p>
                      <br style='mso-ignore:vglayout' clear=ALL>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><span style='font-size:16.0pt;font-family:Gabriola;
          mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Courier New";
          color:#222222;letter-spacing:.6pt;mso-font-kerning:0pt;mso-ligatures:none;
          mso-fareast-language:FR'>Vous pouvez d�sormais ajouter dans votre panier
                          tous les articles qui vous plairont, et passer une commande.<o:p></o:p></span></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><span style='font-size:16.0pt;font-family:Gabriola;
          mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Courier New";
          color:#222222;letter-spacing:.6pt;mso-font-kerning:0pt;mso-ligatures:none;
          mso-fareast-language:FR'>
                          <o:p>&nbsp;</o:p>
                        </span></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><span style='font-size:16.0pt;font-family:Gabriola;
          mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Courier New";
          color:#222222;letter-spacing:.6pt;mso-font-kerning:0pt;mso-ligatures:none;
          mso-fareast-language:FR'>A bient�t&nbsp;!<o:p></o:p></span></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><span style='font-size:3.0pt;font-family:Gabriola;
          mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Courier New";
          color:#222222;letter-spacing:.6pt;mso-font-kerning:0pt;mso-ligatures:none;
          mso-fareast-language:FR'>
                          <o:p>&nbsp;</o:p>
                        </span></p>
                      <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
          line-height:18.0pt'><span style='color:black;mso-color-alt:windowtext;
          mso-ligatures:none;mso-no-proof:yes'><!--[if gte vml 1]><v:shape id="Graphique_x0020_7"
           o:spid="_x0000_i1025" type="#_x0000_t75" alt="Deux c�urs contour" style='width:33.6pt;
           height:33.6pt;visibility:visible;mso-wrap-style:square'>
           <v:imagedata src="MAIL%20BIENVENUE_fichiers/image005.png" o:title="Deux c�urs contour"/>
          </v:shape><![endif]-->
                          <![if !vml]><img width=45 height=45 src="MAIL%20BIENVENUE_fichiers/image006.png"
                            alt="Deux c�urs contour" v:shapes="Graphique_x0020_7">
                          <![endif]>
                        </span><span style='font-size:16.0pt;
          font-family:Gabriola;mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:
          "Courier New";color:#222222;letter-spacing:.6pt;mso-font-kerning:0pt;
          mso-ligatures:none;mso-fareast-language:FR'>
                          <o:p></o:p>
                        </span></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
      
          <p class=MsoNormal style='margin-bottom:0cm;line-height:normal;background:white;
      vertical-align:top'><span style='font-size:1.0pt;font-family:"Helvetica",sans-serif;
      mso-fareast-font-family:"Times New Roman";color:#1D2228;display:none;
      mso-hide:all;mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR'>
              <o:p>&nbsp;</o:p>
            </span></p>
      
          <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center'>
            <o:p>&nbsp;</o:p>
          </p>
      
        </div>
      
      </body>
      
      </html>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            return res.status(500).json(error)
        } else {
            console.log(info)
            return res.status(200).json(info)
        }
    });
}
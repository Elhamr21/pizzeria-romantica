import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Datenschutzerklärung | Pizzeria Romantica',
  description: 'Datenschutzerklärung der Pizzeria Romantica in Hagen.',
}

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Startseite
          </Link>
          <h1 className="text-4xl font-bold text-foreground font-[var(--font-playfair)]">
            Datenschutzerklärung
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Datenschutz auf einen Blick</h2>
            
            <div className="bg-card rounded-lg p-6 border border-border space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Allgemeine Hinweise</h3>
                <p className="text-muted-foreground">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                  Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen 
                  Sie persönlich identifiziert werden können.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Datenerfassung auf dieser Website</h3>
                <p className="text-muted-foreground">
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                  können Sie dem Impressum dieser Website entnehmen.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Wie erfassen wir Ihre Daten?</h3>
                <p className="text-muted-foreground">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. 
                  um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach 
                  Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem 
                  technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Wofür nutzen wir Ihre Daten?</h3>
                <p className="text-muted-foreground">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
                  Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p className="text-muted-foreground">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                  gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
                  oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt 
                  haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das 
                  Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten 
                  zu verlangen.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Hosting</h2>
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Externes Hosting</strong><br />
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, 
                werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, 
                Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, 
                die über eine Website generiert werden, handeln.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <div className="bg-card rounded-lg p-6 border border-border space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Datenschutz</h3>
                <p className="text-muted-foreground">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln 
                  Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften 
                  sowie dieser Datenschutzerklärung.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Hinweis zur verantwortlichen Stelle</h3>
                <p className="text-muted-foreground">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p className="text-muted-foreground mt-2">
                  Pizzeria Romantica<br />
                  Voerder Str. 10<br />
                  58135 Hagen<br />
                  <br />
                  Telefon:  2331 1276622<br />
                  E-Mail: info@pizza-romantica-hagen.de
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Speicherdauer</h3>
                <p className="text-muted-foreground">
                  Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, 
                  verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. 
                  Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung 
                  widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für 
                  die Speicherung Ihrer personenbezogenen Daten haben.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                <p className="text-muted-foreground">
                  Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können 
                  eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf 
                  erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
                <p className="text-muted-foreground">
                  Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer 
                  Aufsichtsbehörde zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher 
                  oder gerichtlicher Rechtsbehelfe.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Recht auf Datenübertragbarkeit</h3>
                <p className="text-muted-foreground">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags 
                  automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format 
                  aushändigen zu lassen.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Auskunft, Löschung und Berichtigung</h3>
                <p className="text-muted-foreground">
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche 
                  Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den 
                  Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Datenerfassung auf dieser Website</h2>
            
            <div className="bg-card rounded-lg p-6 border border-border space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Cookies</h3>
                <p className="text-muted-foreground">
                  Unsere Internetseiten verwenden so genannte &quot;Cookies&quot;. Cookies sind kleine Datenpakete und richten 
                  auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung 
                  (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies 
                  werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät 
                  gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Server-Log-Dateien</h3>
                <p className="text-muted-foreground">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                  die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Anfrage per E-Mail, Telefon oder Telefax</h3>
                <p className="text-muted-foreground">
                  Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus 
                  hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei 
                  uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Plugins und Tools</h2>
            
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-medium text-foreground mb-2">Google Maps</h3>
              <p className="text-muted-foreground">
                Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited (&quot;Google&quot;), 
                Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der Funktionen von Google Maps ist es 
                notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von 
                Google in den USA übertragen und dort gespeichert.
              </p>
              <p className="text-muted-foreground mt-4">
                Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google:{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://policies.google.com/privacy
                </a>
              </p>
            </div>
          </section>

          <section className="pb-8">
            <p className="text-sm text-muted-foreground">
              Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}

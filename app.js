const initialData = [
  {
    id: 1,
    title: "Gravitational Acceleration Formula (Full Form) In2025",
    type: "Presentation",
    posted_date: "2025-10-04",
    description: "Presentation on gravitational acceleration formulas in 2025.",
    public_url: "https://figshare.com/articles/presentation/Gravitational_Acceleration_Formula_Full_Form_In2025/30277669"
  },
  {
    id: 2,
    title: "A Mathematical Framework for Comparing Binocular Vision and Wave Interference",
    type: "Thesis",
    posted_date: "2025-08-30",
    description: "Thesis comparing binocular vision and wave interference mathematically.",
    public_url: "https://figshare.com/articles/thesis/A_Mathematical_Framework_forComparing_Binocular_Vision_andWave_Interference/30016591"
  },
  {
    id: 3,
    title: "Root-Power Arithmetic ⊛Universe",
    type: "Thesis",
    posted_date: "2025-08-27",
    description: "Thesis exploring root-power arithmetic in a universal context.",
    public_url: "https://figshare.com/articles/thesis/Root-Power_Arithmetic_Universe/29992411"
  },
  {
    id: 4,
    title: "A Swiss Conditional Framework for Legendre's Conjecture",
    type: "Thesis",
    posted_date: "2025-08-22",
    description: "Thesis proposing a conditional framework for Legendre's conjecture.",
    public_url: "https://figshare.com/articles/thesis/A_Swiss_Conditional_Framework_for_Legendre_s_Conjecture/29967043"
  },
  {
    id: 5,
    title: "TWISTING EQUATIONS FROM DISCRETE SUMS TO CONTINUOUS TRUTHS",
    type: "Thesis",
    posted_date: "2025-08-16",
    description: "Thesis on transforming discrete sums into continuous equations.",
    public_url: "https://figshare.com/articles/thesis/TWISTING_EQUATIONS_FROM_DISCRETE_SUMS_TO_CONTINUOUSTRUTHS/29924387"
  },
  {
    id: 6,
    title: "DELTA-REGULARIZED ZETA FUNCTION AND THE RIEMANN HYPOTHESIS",
    type: "Thesis",
    posted_date: "2025-08-05",
    description: "Thesis on delta-regularized zeta function and its relation to the Riemann Hypothesis.",
    public_url: "https://figshare.com/articles/thesis/SwissRh_DeltaZeta_RH_2025_pdf_pdf/29829023"
  }
];

// ✅ ใช้ LibreTranslate (โอเพนซอร์ส แปลได้ตลอด)
async function translateText(text, lang) {
  if (!text || lang === "en") return text;
  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "en",
        target: lang,
        format: "text"
      }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    return data.translatedText || text;
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}

function App() {
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("darkMode") === "true" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [language, setLanguage] = React.useState("en");

  React.useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 p-4 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white">
            Figshare Explorer – Swiss Russameekiattisak
          </h1>
          <div className="flex gap-2 items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-2 py-1 text-sm rounded bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="en">English</option>
              <option value="th">ไทย</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
              <option value="ru">Русский</option>
              <option value="ko">한국어</option>
            </select>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition text-sm sm:text-base shadow-md"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <DatasetList initialData={initialData} language={language} />
      </main>

      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 mt-8">
        © 2025 Swiss Russameekiattisak — Figshare Academic Viewer
      </footer>
    </div>
  );
}

function DatasetList({ initialData, language }) {
  const [translatedData, setTranslatedData] = React.useState(initialData);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (language === "en") {
      setTranslatedData(initialData);
      return;
    }
    async function translateAll() {
      setLoading(true);
      const translated = await Promise.all(
        initialData.map(async (item) => ({
          ...item,
          title: await translateText(item.title, language),
          description: await translateText(item.description, language)
        }))
      );
      setTranslatedData(translated);
      setLoading(false);
    }
    translateAll();
  }, [language]);

  return (
    <div>
      {loading && <p className="text-blue-500 mb-2 animate-pulse">Translating...</p>}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {translatedData.map((d) => (
          <li
            key={d.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <a
              href={d.public_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold block mb-2"
            >
              {d.title}
            </a>
            <p className="text-sm opacity-90">{d.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              📄 {d.type} • {d.posted_date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

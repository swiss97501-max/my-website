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

function App() {
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem("darkMode") === "true" || window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [language, setLanguage] = React.useState("en"); // ✅ เพิ่ม state ภาษาปลายทาง

  React.useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return React.createElement(
    "div",
    { className: `min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}` },
    React.createElement(
      "header",
      { className: "bg-blue-600 dark:bg-blue-800 p-4 shadow-md" },
      React.createElement(
        "div",
        { className: "container mx-auto flex flex-col sm:flex-row justify-between items-center gap-3" },
        React.createElement(
          "h1",
          { className: "text-xl sm:text-2xl font-bold" },
          "Figshare Explorer - Swiss Russameekiattisak (สวิส รัศมีเกียรติศักดิ์)"
        ),
        React.createElement(
          "div",
          { className: "flex gap-2 items-center" },
          React.createElement(
            "select",
            {
              value: language,
              onChange: (e) => setLanguage(e.target.value),
              className: "px-2 py-1 text-sm rounded bg-white dark:bg-gray-700 dark:text-white"
            },
            React.createElement("option", { value: "en" }, "English"),
            React.createElement("option", { value: "th" }, "ไทย"),
            React.createElement("option", { value: "es" }, "Español"),
            React.createElement("option", { value: "fr" }, "Français"),
            React.createElement("option", { value: "de" }, "Deutsch"),
            React.createElement("option", { value: "zh" }, "中文"),
            React.createElement("option", { value: "ja" }, "日本語"),
            React.createElement("option", { value: "ru" }, "Русский"),
            React.createElement("option", { value: "ko" }, "한국어")
          ),
          React.createElement(
            "button",
            {
              onClick: () => setDarkMode(!darkMode),
              className: "px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm sm:text-base",
              "aria-label": "Toggle dark/light mode"
            },
            darkMode ? "Light" : "Dark"
          )
        )
      )
    ),
    React.createElement(
      "main",
      { className: "container mx-auto p-4" },
      React.createElement(DatasetList, { initialData: initialData, language: language })
    )
  );
}

// ✅ เพิ่มฟังก์ชันแปล
async function translateText(text, lang) {
  if (lang === "en" || !text) return text; // ถ้าเป็นอังกฤษหรือว่าง ไม่ต้องแปล
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`
    );
    const data = await res.json();
    return data.responseData.translatedText || text;
  } catch {
    return text; // ถ้า error ก็ใช้ต้นฉบับ
  }
}

function DatasetList({ initialData, language }) {
  const [data, setData] = React.useState(initialData);
  const [translatedData, setTranslatedData] = React.useState(initialData);
  const [loading, setLoading] = React.useState(false);

  // ✅ เมื่อเปลี่ยนภาษา — แปลทุก title และ description
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
          description: await translateText(item.description, language),
        }))
      );
      setTranslatedData(translated);
      setLoading(false);
    }
    translateAll();
  }, [language]);

  return React.createElement(
    "div",
    null,
    loading && React.createElement("p", { className: "text-blue-500 mb-2" }, "Translating..."),
    React.createElement(
      "ul",
      { className: "space-y-4" },
      translatedData.map((d) =>
        React.createElement(
          "li",
          { key: d.id, className: "p-3 bg-white dark:bg-gray-800 rounded shadow" },
          React.createElement(
            "a",
            {
              href: d.public_url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-blue-600 dark:text-blue-400 hover:underline text-base sm:text-lg font-semibold"
            },
            d.title
          ),
          React.createElement("p", { className: "text-xs sm:text-sm mt-1" }, d.description)
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));

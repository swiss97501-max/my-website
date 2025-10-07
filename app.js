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
        { className: "container mx-auto flex justify-between items-center" },
        React.createElement(
          "h1",
          { className: "text-xl sm:text-2xl font-bold" },
          "Figshare Explorer - Swiss Russameekiattsak"
        ),
        React.createElement(
          "button",
          {
            onClick: () => setDarkMode(!darkMode),
            className: "px-3 py-1 sm:px-4 sm:py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm sm:text-base",
            "aria-label": "Toggle dark/light mode"
          },
          darkMode ? "Light Mode" : "Dark Mode"
        )
      )
    ),
    React.createElement(
      "main",
      { className: "container mx-auto p-4" },
      React.createElement(DatasetList, { initialData: initialData })
    )
  );
}

function DatasetList({ initialData }) {
  const [data, setData] = React.useState(initialData);
  const [filtered, setFiltered] = React.useState(initialData);
  const [search, setSearch] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");
  const [bookmarks, setBookmarks] = React.useState(
    JSON.parse(localStorage.getItem("bookmarks") || "[]")
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 3;

  const loadData = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setData(initialData);
      setFiltered(initialData);
      setCurrentPage(1);
      setLoading(false);
    }, 500);
  };

  React.useEffect(() => {
    let filteredData = data;
    if (search) {
      filteredData = filteredData.filter((d) =>
        d.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (dateFilter) {
      filteredData = filteredData.filter(
        (d) => d.posted_date === dateFilter
      );
    }
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [search, dateFilter, data]);

  const addBookmark = (item) => {
    if (!bookmarks.some((b) => b.id === item.id)) {
      const newBookmarks = [...bookmarks, item];
      setBookmarks(newBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    }
  };

  const removeBookmark = (id) => {
    const newBookmarks = bookmarks.filter((b) => b.id !== id);
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  const isBookmarked = (id) => bookmarks.some((b) => b.id === id);

  const handleLinkClick = (url, title) => {
    console.log(`คลิกลิงก์: ${url} สำหรับ ${title}`);
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.log(`ลิงก์ไม่ถูกต้องสำหรับ ${title}`);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return React.createElement(
    "div",
    { className: "space-y-6" },
    React.createElement(
      "div",
      { className: "flex flex-col sm:flex-row gap-2 sm:gap-4" },
      React.createElement(
        "button",
        {
          onClick: loadData,
          disabled: loading,
          className: "px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 text-sm sm:text-base"
        },
        loading ? "กำลังโหลด..." : "รีเฟรชข้อมูล"
      ),
      React.createElement(
        "input",
        {
          type: "text",
          placeholder: "ค้นหาด้วยชื่อ (เช่น Riemann, Gravitational)",
          className: "px-3 py-1 sm:px-4 sm:py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 flex-1 text-sm sm:text-base",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "aria-label": "Search datasets by name"
        }
      ),
      React.createElement(
        "input",
        {
          type: "date",
          className: "px-3 py-1 sm:px-4 sm:py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm sm:text-base",
          value: dateFilter,
          onChange: (e) => setDateFilter(e.target.value),
          "aria-label": "Filter by posted date"
        }
      )
    ),
    error && React.createElement(
      "div",
      { className: "p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded" },
      error,
      React.createElement(
        "button",
        {
          onClick: loadData,
          className: "ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        },
        "ลองใหม่"
      )
    ),
    loading && React.createElement(
      "div",
      { className: "flex justify-center items-center" },
      React.createElement(
        "svg",
        {
          className: "animate-spin h-6 w-6 sm:h-8 sm:w-8 text-blue-500",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24"
        },
        React.createElement("circle", {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }),
        React.createElement("path", {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
        })
      ),
      React.createElement("span", { className: "ml-2 text-sm sm:text-base" }, "กำลังโหลดข้อมูล...")
    ),
    React.createElement(
      "section",
      null,
      React.createElement(
        "h2",
        { className: "text-lg sm:text-xl font-semibold mb-2" },
        "บุ๊กมาร์ก"
      ),
      bookmarks.length === 0 ? (
        React.createElement(
          "p",
          { className: "text-gray-500 dark:text-gray-400 text-sm sm:text-base" },
          "ยังไม่มีบุ๊กมาร์ก เพิ่มจากผลงานด้านล่าง!"
        )
      ) : (
        React.createElement(
          "ul",
          { className: "space-y-2" },
          bookmarks.map((b) =>
            React.createElement(
              "li",
              {
                key: b.id,
                className: "p-2 bg-gray-200 dark:bg-gray-700 rounded flex justify-between items-center"
              },
              b.public_url && b.public_url !== "#" ? (
                React.createElement(
                  "a",
                  {
                    href: b.public_url,
                    onClick: () => handleLinkClick(b.public_url, b.title),
                    className: "hover:underline text-sm sm:text-base truncate flex-1"
                  },
                  b.title
                )
              ) : (
                React.createElement(
                  "span",
                  { className: "text-gray-500 text-sm sm:text-base truncate flex-1" },
                  b.title + " (ผลงานไม่พร้อมใช้งาน)"
                )
              ),
              React.createElement(
                "button",
                {
                  onClick: () => removeBookmark(b.id),
                  className: "px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm",
                  "aria-label": "Remove bookmark"
                },
                "ลบ"
              )
            )
          )
        )
      )
    ),
    React.createElement(
      "section",
      null,
      React.createElement(
        "h2",
        { className: "text-lg sm:text-xl font-semibold mb-2" },
        "ผลงานของ Swiss Russameekiattsak (6 รายการ)"
      ),
      currentItems.length === 0 && !loading ? (
        React.createElement(
          "p",
          { className: "text-gray-500 dark:text-gray-400 text-sm sm:text-base" },
          "ไม่พบผลงานที่ตรงกับตัวกรอง ลองปรับการค้นหาหรือวันที่"
        )
      ) : (
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" },
            currentItems.map((d) =>
              React.createElement(
                "div",
                {
                  key: d.id,
                  className: "p-3 sm:p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition"
                },
                React.createElement(
                  "div",
                  null,
                  d.public_url && d.public_url !== "#" ? (
                    React.createElement(
                      "a",
                      {
                        href: d.public_url,
                        onClick: () => handleLinkClick(d.public_url, d.title),
                        className: "text-base sm:text-lg font-semibold hover:underline block mb-1"
                      },
                      d.title
                    )
                  ) : (
                    React.createElement(
                      "span",
                      { className: "text-base sm:text-lg font-semibold block mb-1" },
                      d.title + " (ผลงานไม่พร้อมใช้งาน)"
                    )
                  ),
                  React.createElement(
                    "p",
                    { className: "text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1" },
                    `ประเภท: ${d.type} | เผยแพร่: ${new Date(d.posted_date).toLocaleDateString("th-TH")}`
                  ),
                  React.createElement(
                    "p",
                    { className: "text-xs sm:text-sm text-gray-700 dark:text-gray-300" },
                    d.description
                  )
                ),
                React.createElement(
                  "div",
                  { className: "mt-3 sm:mt-4 flex gap-2 flex-wrap" },
                  d.public_url && d.public_url !== "#" ? (
                    React.createElement(
                      "a",
                      {
                        href: d.public_url,
                        onClick: () => handleLinkClick(d.public_url, d.title),
                        className: "px-2 py-1 sm:px-3 sm:py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm"
                      },
                      "ดูรายละเอียด"
                    )
                  ) : (
                    React.createElement(
                      "span",
                      { className: "px-2 py-1 sm:px-3 sm:py-1 bg-gray-400 text-white rounded text-xs sm:text-sm cursor-not-allowed" },
                      "ไม่มีลิงก์"
                    )
                  ),
                  React.createElement(
                    "button",
                    {
                      onClick: () => addBookmark(d),
                      disabled: isBookmarked(d.id),
                      className: `px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm whitespace-nowrap ${
                        isBookmarked(d.id)
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-yellow-500 text-white hover:bg-yellow-600"
                      }`,
                      "aria-label": isBookmarked(d.id) ? "Already bookmarked" : "Add to bookmarks"
                    },
                    isBookmarked(d.id) ? "บุ๊กมาร์กแล้ว" : "บุ๊กมาร์ก"
                  )
                )
              )
            )
          ),
          totalPages > 1 && React.createElement(
            "div",
            { className: "flex justify-between items-center mt-4" },
            React.createElement(
              "button",
              {
                onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
                disabled: currentPage === 1,
                className: "px-2 py-1 sm:px-3 sm:py-1 bg-gray-300 dark:bg-gray-600 rounded disabled:opacity-50 text-xs sm:text-sm"
              },
              "ก่อนหน้า"
            ),
            React.createElement(
              "span",
              { className: "text-xs sm:text-sm" },
              `หน้า ${currentPage} จาก ${totalPages}`
            ),
            React.createElement(
              "button",
              {
                onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
                disabled: currentPage === totalPages,
                className: "px-2 py-1 sm:px-3 sm:py-1 bg-gray-300 dark:bg-gray-600 rounded disabled:opacity-50 text-xs sm:text-sm"
              },
              "ถัดไป"
            )
          )
        )
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
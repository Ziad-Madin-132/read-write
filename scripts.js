/* scripts.js - مشترك */
const speak = (text, rate = 0.95) => {
  if (!("speechSynthesis" in window))
    return alert("جهازك لا يدعم تحويل النص لصوت");
  const u = new SpeechSynthesisUtterance();
  u.lang = "ar-SA"; // or 'ar-EG' depending on voice availability
  u.text = text;
  u.rate = rate;
  // try to pick an Arabic voice if available
  const voices = speechSynthesis.getVoices();
  const ar = voices.find((v) => v.lang.startsWith("ar")) || voices[0];
  if (ar) u.voice = ar;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
};

/* for beginner game: check choice */
function beginnerSetup(data) {
  const imageEl = document.getElementById("b-image");
  const letterEl = document.getElementById("b-letter");
  const choicesEl = document.getElementById("b-choices");
  const speakBtn = document.getElementById("b-sound");

  let idx = 0;
  function load() {
    const cur = data[idx];
    imageEl.src = cur.img;
    letterEl.textContent = cur.letter;
    choicesEl.innerHTML = "";
    cur.choices.forEach((ch) => {
      const d = document.createElement("div");
      d.className = "choice";
      d.textContent = ch;
      d.onclick = () => {
        if (ch === cur.answer) {
          d.classList.add("correct");
          d.innerHTML = "✅ " + ch;
          speak("صحيح، أحسنت");
        } else {
          d.classList.add("wrong");
          d.innerHTML = "❌ " + ch;
          speak("حاول مرة أخرى");
        }
        setTimeout(() => {
          idx = (idx + 1) % data.length;
          load();
        }, 900);
      };
      choicesEl.appendChild(d);
    });
    speakBtn.onclick = () => speak(cur.letter);
  }
  load();
}

/* for intermediate drag-and-drop sentence builder */
function intermediateSetup(levels) {
  const wordsPool = document.getElementById("words-pool");
  const dropZone = document.getElementById("drop-zone");
  const checkBtn = document.getElementById("check-sentence");
  const playBtn = document.getElementById("play-sentence");

  let current = 0;
  function load() {
    const q = levels[current];
    wordsPool.innerHTML = "";
    dropZone.innerHTML = "";
    const shuffled = q.words
      .map((w) => ({ w }))
      .sort(() => Math.random() - 0.5);
    shuffled.forEach((item) => {
      const el = document.createElement("div");
      el.className = "word";
      el.draggable = true;
      el.textContent = item.w;
      el.addEventListener("dragstart", (e) =>
        e.dataTransfer.setData("text/plain", item.w)
      );
      wordsPool.appendChild(el);
    });
    checkBtn.onclick = () => {
      const formed = Array.from(dropZone.children)
        .map((c) => c.textContent.trim())
        .join(" ");
      if (formed === q.answer) {
        playFeedback(true);
        speak("جملة صحيحة");
        setTimeout(() => {
          current = (current + 1) % levels.length;
          load();
        }, 900);
      } else {
        playFeedback(false);
        speak("ليس صحيحًا، حاول ترتيب الكلمات");
      }
    };
    playBtn.onclick = () => speak(q.answer, 0.95);
  }

  function playFeedback(ok) {
    const f = document.getElementById("int-feedback");
    f.textContent = ok ? "✅ ممتاز" : "❌ حاول مرة أخرى";
    f.className = ok ? "correct" : "wrong";
  }

  // drop handlers
  dropZone.addEventListener("dragover", (e) => e.preventDefault());
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    if (!text) return;
    const n = document.createElement("div");
    n.className = "word";
    n.textContent = text;
    n.onclick = () => n.remove();
    dropZone.appendChild(n);
  });

  load();
}

/* advanced: reading + MCQ */
function advancedSetup(questions) {
  const textArea = document.getElementById("adv-text");
  const playBtn = document.getElementById("adv-play");
  const qBox = document.getElementById("adv-questions");
  const result = document.getElementById("adv-result");
  let idx = 0;

  function load() {
    const cur = questions[idx];
    textArea.textContent = cur.paragraph;
    qBox.innerHTML = "";
    cur.qs.forEach((q, i) => {
      const container = document.createElement("div");
      container.style.marginTop = "12px";
      const qh = document.createElement("div");
      qh.textContent = i + 1 + ". " + q.q;
      container.appendChild(qh);
      q.options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "small";
        btn.style.margin = "8px 8px 0 0";
        btn.textContent = opt;
        btn.onclick = () => {
          if (opt === q.answer) {
            btn.style.background = "#e6ffef";
            btn.textContent = "✅ " + opt;
            speak("إجابة صحيحة");
          } else {
            btn.style.background = "#ffecec";
            btn.textContent = "❌ " + opt;
            speak("إجابة خاطئة");
          }
          setTimeout(() => {
            idx = (idx + 1) % questions.length;
            load();
          }, 1200);
        };
        container.appendChild(btn);
      });
      qBox.appendChild(container);
    });
    playBtn.onclick = () => speak(cur.paragraph, 0.95);
  }
  load();
}

/* pro: dictation / spelling */
function proSetup(words) {
  const playBtn = document.getElementById("pro-play");
  const input = document.getElementById("pro-input");
  const checkBtn = document.getElementById("pro-check");
  const feedback = document.getElementById("pro-feedback");
  let idx = 0;

  function load() {
    input.value = "";
    feedback.textContent = "";
    input.placeholder = "اكتب هنا ما تسمعه...";
  }

  playBtn.onclick = () => {
    const w = words[idx];
    speak(w, 0.95);
  };
  checkBtn.onclick = () => {
    const w = words[idx];
    const ans = input.value.trim();
    if (!ans) {
      feedback.textContent = "أكتب الإجابة أولا";
      return;
    }
    if (ans === w) {
      feedback.className = "correct";
      feedback.textContent = "✅ صحيح!";
      speak("إجابتك صحيحة");
      idx = (idx + 1) % words.length;
      setTimeout(load, 900);
    } else {
      feedback.className = "wrong";
      feedback.textContent = "❌ خطأ. حاول مرة أخرى";
      speak("حاول، حاول مرة أخرى");
    }
  };

  load();
}

/* small util to highlight nav active */
document.addEventListener("DOMContentLoaded", () => {
  const navs = document.querySelectorAll("a.nav-link");
  navs.forEach((a) => {
    if (
      location.pathname.endsWith(a.getAttribute("href")) ||
      (a.getAttribute("href") === "index.html" &&
        location.pathname.endsWith("/"))
    ) {
      a.style.background =
        "linear-gradient(90deg,var(--accent),var(--accent-dark))";
      a.style.color = "white";
    }
  });
});

const intermediateLevels = [
        { words: ["أنا", "أحب", "المدرسة"], answer: "أنا أحب المدرسة" },
        {
          words: ["ذهب", "محمود", "إلى", "السوق"],
          answer: "محمود ذهب إلى السوق",
        },
        {
          words: ["تلعب", "الطفلة", "في", "الحديقة"],
          answer: "الطفلة تلعب في الحديقة",
        },
        { words: ["قرأ", "محمد", "الكتاب"], answer: "محمد قرأ الكتاب" },
        {
          words: ["تدرس", "عائشة", "اللغة", "العربية"],
          answer: "عائشة تدرس اللغة العربية",
        },
        {
          words: ["يحب", "أحمد", "كرة", "القدم"],
          answer: "أحمد يحب كرة القدم",
        },
        {
          words: ["ذهب", "الطلاب", "إلى", "المدرسة"],
          answer: "الطلاب ذهبوا إلى المدرسة",
        },
        { words: ["أكلت", "سارة", "التفاح"], answer: "سارة أكلت التفاح" },
        {
          words: ["لعب", "الأطفال", "في", "الحديقة"],
          answer: "الأطفال لعبوا في الحديقة",
        },
        { words: ["شاهد", "علي", "الفيلم"], answer: "علي شاهد الفيلم" },
        {
          words: ["زرع", "المزارع", "الخضروات"],
          answer: "المزارع زرع الخضروات",
        },
        { words: ["تقرأ", "لمياء", "القصص"], answer: "لمياء تقرأ القصص" },
        {
          words: ["سافر", "الطالب", "إلى", "باريس"],
          answer: "الطالب سافر إلى باريس",
        },
        { words: ["شرب", "يوسف", "الماء"], answer: "يوسف شرب الماء" },
        { words: ["غسلت", "الأم", "الأطباق"], answer: "الأم غسلت الأطباق" },
      ];

      let current = 0;

      function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
      }

      function speak(text) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "ar-SA";
        speechSynthesis.speak(u);
      }

      function loadSentence() {
        document.getElementById("int-feedback").textContent = "";
        if (current >= intermediateLevels.length) {
          document.querySelector(".game-frame").innerHTML =
            "<div style='display:flex; flex-direction:column; justify-content:center; align-items:center; height:300px;'>" +
            "<div style='font-size:24px; font-weight:bold; text-align:center'>🎉 تم الانتهاء من المستوى</div>" +
            "<a class='btn' href='advanced.html' style='margin-top:14px'>الانتقال للمستوى التالي</a></div>";
          return;
        }

        const level = intermediateLevels[current];
        const words = shuffle([...level.words]);
        const pool = document.getElementById("words-pool");
        const dropZone = document.getElementById("drop-zone");

        pool.innerHTML = "";
        dropZone.innerHTML = "";

        words.forEach((w) => {
          const btn = document.createElement("button");
          btn.textContent = w;
          btn.className = "btn";
          btn.onclick = () => {
            dropZone.appendChild(btn);
          };
          pool.appendChild(btn);
        });

        document.getElementById("check-sentence").onclick = () => {
          const sentence = Array.from(dropZone.children)
            .map((c) => c.textContent)
            .join(" ");
          if (sentence === level.answer) {
            speak(sentence);
            document.getElementById("int-feedback").textContent = "✅ أحسنت!";
            current++;
            setTimeout(loadSentence, 800);
          } else {
            document.getElementById("int-feedback").textContent =
              "❌ حاول مرة أخرى";
          }
        };

        document.getElementById("play-sentence").onclick = () => {
          const sentence = Array.from(dropZone.children)
            .map((c) => c.textContent)
            .join(" ");
          speak(sentence);
        };
      }

      document.addEventListener("DOMContentLoaded", loadSentence);


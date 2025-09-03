const advSet = [
        {
          paragraph:
            "ذهب سامي إلى الحديقة في الصباح ليأخذ فُسحة قصيرة. شاهد طيوراً جميلة ولعب مع صديقه.",
          qs: [
            {
              q: "إلى أين ذهب سامي؟",
              options: ["المدرسة", "الحديقة", "المستشفى"],
              answer: "الحديقة",
            },
            {
              q: "ماذا شاهد سامي؟",
              options: ["أسماك", "طيور", "سيارات"],
              answer: "طيور",
            },
          ],
        },
        {
          paragraph:
            "يحب أحمد قراءة الكتب في المكتبة لأنه يجد هدوءًا وتركيزًا. يساعده ذلك على التعلم.",
          qs: [
            {
              q: "أين يقرأ أحمد؟",
              options: ["في البيت", "في الحديقة", "في المكتبة"],
              answer: "في المكتبة",
            },
          ],
        },
        {
          paragraph: "ذهبت ليلى إلى السوق لشراء الفواكه والخضروات الطازجة.",
          qs: [
            {
              q: "ماذا اشترت ليلى؟",
              options: ["لحوم", "فواكه وخضروات", "ملابس"],
              answer: "فواكه وخضروات",
            },
          ],
        },
        {
          paragraph: "أحب الأطفال اللعب في الحديقة والاستمتاع بالزهور.",
          qs: [
            {
              q: "أين يلعب الأطفال؟",
              options: ["في الحديقة", "في البيت", "في المدرسة"],
              answer: "في الحديقة",
            },
          ],
        },
        {
          paragraph: "سافر محمد إلى القاهرة لحضور مؤتمر علمي.",
          qs: [
            {
              q: "أين سافر محمد؟",
              options: ["الإسكندرية", "القاهرة", "الأقصر"],
              answer: "القاهرة",
            },
          ],
        },
        {
          paragraph: "الطيور تهاجر في فصل الشتاء بحثًا عن الطقس الدافئ.",
          qs: [
            {
              q: "ماذا تفعل الطيور في الشتاء؟",
              options: ["تنام", "تهاجر", "تلعب"],
              answer: "تهاجر",
            },
          ],
        },
        {
          paragraph: "قرأت سارة كتابًا عن الفضاء والكواكب.",
          qs: [
            {
              q: "عن ماذا قرأت سارة؟",
              options: ["الفضاء والكواكب", "الحيوانات", "الحدائق"],
              answer: "الفضاء والكواكب",
            },
          ],
        },
        {
          paragraph: "ذهب الطلاب إلى المكتبة لإتمام مشروعهم الدراسي.",
          qs: [
            {
              q: "أين ذهب الطلاب؟",
              options: ["إلى المدرسة", "إلى المكتبة", "إلى الحديقة"],
              answer: "إلى المكتبة",
            },
          ],
        },
        {
          paragraph: "زرع المزارع الخضروات في الأرض الزراعية.",
          qs: [
            {
              q: "ماذا زرع المزارع؟",
              options: ["زهور", "خضروات", "شجر"],
              answer: "خضروات",
            },
          ],
        },
        {
          paragraph: "تحب فاطمة رسم اللوحات الجميلة في أوقات فراغها.",
          qs: [
            {
              q: "ماذا تحب فاطمة؟",
              options: ["السباحة", "الرسم", "القراءة"],
              answer: "الرسم",
            },
          ],
        },
        {
          paragraph: "ذهب سامي وأصدقاؤه لمشاهدة فيلم في السينما.",
          qs: [
            {
              q: "أين ذهب سامي؟",
              options: ["إلى المسرح", "إلى السينما", "إلى المدرسة"],
              answer: "إلى السينما",
            },
          ],
        },
        {
          paragraph: "الطيار يقود الطائرة بأمان للركاب.",
          qs: [
            {
              q: "ماذا يفعل الطيار؟",
              options: ["يقود القطار", "يقود الطائرة", "يقود السيارة"],
              answer: "يقود الطائرة",
            },
          ],
        },
        {
          paragraph: "تعلّم الأطفال القراءة والكتابة في المدرسة.",
          qs: [
            {
              q: "ماذا يتعلم الأطفال؟",
              options: ["القراءة والكتابة", "السباحة", "الرسم"],
              answer: "القراءة والكتابة",
            },
          ],
        },
        {
          paragraph: "تعمل المعلمة على تعليم الطلاب بأسلوب ممتع.",
          qs: [
            {
              q: "ماذا تفعل المعلمة؟",
              options: ["تعلّم الطلاب", "تطبخ", "ترسم"],
              answer: "تعلّم الطلاب",
            },
          ],
        },
        {
          paragraph: "يحب سامر رياضة كرة القدم ويشاهد المباريات.",
          qs: [
            {
              q: "ما الرياضة التي يحبها سامر؟",
              options: ["كرة القدم", "التنس", "السباحة"],
              answer: "كرة القدم",
            },
          ],
        },
      ];

      let current = 0;

      function speak(text) {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "ar-SA";
        speechSynthesis.speak(u);
      }

      function advancedSetup(set) {
        const advText = document.getElementById("adv-text");
        const advQuestions = document.getElementById("adv-questions");
        const advResult = document.getElementById("adv-result");
        const advPlay = document.getElementById("adv-play");

        function loadAdv() {
          advResult.textContent = "";
          advQuestions.innerHTML = "";
          if (current >= set.length) {
            document.querySelector(".game-frame").innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:300px; text-align:center;">
          <div style="font-size:24px; font-weight:bold;">🎉 تم الانتهاء من المستوى</div>
          <a class="btn" href="pro.html" style="margin-top:14px;">الانتقال للمستوى التالي</a>
        </div>
      `;
            return;
          }

          const item = set[current];
          advText.textContent = item.paragraph;

          item.qs.forEach((q, i) => {
            const div = document.createElement("div");
            div.style.marginTop = "10px";

            const qDiv = document.createElement("div");
            qDiv.textContent = i + 1 + ". " + q.q;
            qDiv.style.fontWeight = "bold";
            div.appendChild(qDiv);

            q.options.forEach((opt) => {
              const btn = document.createElement("button");
              btn.textContent = opt;
              btn.className = "btn";
              btn.style.margin = "4px";
              btn.onclick = () => {
                if (opt === q.answer) {
                  speak(opt);
                  advResult.textContent = "✅ أحسنت!";
                  setTimeout(() => {
                    current++;
                    loadAdv();
                  }, 800);
                } else {
                  advResult.textContent = "❌ حاول مرة أخرى";
                }
              };
              div.appendChild(btn);
            });

            advQuestions.appendChild(div);
          });
        }

        advPlay.onclick = () => {
          speak(advText.textContent);
        };
        loadAdv();
      }

      document.addEventListener("DOMContentLoaded", () =>
        advancedSetup(advSet)
      );


// Тоглоомын бүх газарт ашиглагдах глобал хувьсагчдыг энд зарлая
// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNameGame;

// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална
var activePlayer;
// Хоёр тоглогчийн цуглуулсан оноо
var scores = 0;
// Идэвхтэй тоглогчийн цуглуулж байгаа ээлжийн оноо
var roundScore;
// шооны зургийг үзүүлэх элементийг ДОМ-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүлье
initGame();

// Тоглоомыг шинээр эхлэхэд бэлтгэх
function initGame() {
    // Тоглоом эхэллээ гэдэг төлөвт оруулна
    isNameGame = true;

    // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглье.
    activePlayer = 0;

    // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
    scores = [0, 0];
    // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;
    // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
    // Програм эхлэхэд бэлтгэе
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";

    // Тоглогчдын нэрийг буцааж гаргах
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');

    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');

    document.querySelector(".player-0-panel").classList.add('active');

    diceDom.style.display = 'none';
}
// Шоог шидэх эвэн листенер
document.querySelector(".btn-roll").addEventListener('click', function () {
    if (isNameGame) {
        // 1-6 доторх санамсаргүй нэг тоо гаргаж авна
        var diceNumber = Math.floor(Math.random() * 6) + 1;
        // Шооны зургийг вэб дээр гаргаж ирнэ
        diceDom.style.display = 'block';
        // Буусан санамсаргүй тоонд харгалзах тооны зургийг вэб дээр гаргаж ирнэ
        diceDom.src = 'dice-' + diceNumber + '.png';
        // Буусан тоо нь 1-ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ
        if (diceNumber !== 1) {
            // 1-ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө
            roundScore = roundScore + diceNumber;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
            switchToNextPlayer();
            // if (activePlayer === 0) {
            //     activePlayer = 1;
            // } else {
            //     activePlayer = 0;
            // }
        }
    } else {
        alert('Тоглоом дууссан байна. New Game товчийг дарж шинээр эхлэнэ үү')
    }
});

// Hold товчны эвэнт линстенер
document.querySelector(".btn-hold").addEventListener('click', function () {
    if (isNameGame) {
        // Уг тоглогчийн цуглуулсан ээлжний оноог глобал оноон дээр нь нэмж өгнө
        // if (activePlayer === 0) {
        //     scores[0] = scores[0] + roundScore;
        // } else {
        //     scores[1] = scores[1] + roundScore;
        // }
        scores[activePlayer] = scores[activePlayer] + roundScore;

        // Дэлгэц дээр оноог өөрчилнө
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        // Уг тоглогч хожсон эсэхийг шалгах (оноо нь 100-с их эсэх)
        if (scores[activePlayer] >= 100) {
            // Тоглоомыг дууссан төлөвт оруулна
            isNameGame = false;
            // ялагч гэсэн текстийг нэрнийх нь оронд гаргана
            document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add("winner");
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove("active");
        } else {
            // Тоглогчийн ээлжийг солино
            switchToNextPlayer();
            // DRY - Don't repeat yourself
        }
    } else {
        alert('Тоглоом дууссан байна. New Game товчийг дарж шинээр эхлэнэ үү')
    }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг
function switchToNextPlayer() {
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;

    // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    // Улаан цэгийг шилжүүлэх
    document.querySelector(".player-0-panel").classList.toggle("active");
    // document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // Шоог түр алга болгоно
    diceDom.style.display = "none";
}

// Шинэ тоглоом эхлүүлэх товчний эвэнт листенер
document.querySelector('.btn-new').addEventListener('click', initGame);

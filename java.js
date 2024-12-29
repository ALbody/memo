const videoElement = document.getElementById('video');
const output = document.getElementById('output');

// محاولة الحصول على الكاميرا
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        // تم الحصول على تدفق الفيديو بنجاح
        videoElement.srcObject = stream;
        videoElement.onloadedmetadata = () => {
            videoElement.play(); // تشغيل الفيديو بعد تحميله
        };
        output.innerHTML = "<p>الكاميرا تعمل الآن!</p>";
    })
    .catch((error) => {
        handleCameraError(error);
    });

// التعامل مع الأخطاء المختلفة في الوصول إلى الكاميرا
function handleCameraError(error) {
    if (error.name === 'NotFoundError') {
        output.innerHTML = "لم يتم العثور على كاميرا، تأكد من توصيل الكاميرا بالجهاز.";
    } else if (error.name === 'NotAllowedError') {
        output.innerHTML = "لم تسمح للمتصفح بالوصول إلى الكاميرا، يرجى تعديل الإعدادات.";
    } else if (error.name === 'NotReadableError') {
        output.innerHTML = "حدثت مشكلة في قراءة الكاميرا، حاول إعادة توصيل الكاميرا.";
    } else if (error.name === 'OverconstrainedError') {
        output.innerHTML = "توجد قيود على إعدادات الكاميرا، تأكد من موافقة الإعدادات المطلوبة.";
    } else {
        output.innerHTML = error.message;
    }
}

// تفعيل Mediapipe اليد للكشف عن الإشارات
const hands = new Hands({
    locateFile: (file) => https//cdn.jsdelivr.net/npm/@mediapipe/hands/${file},
});

hands.setOptions({
    maxNumHands: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
});

// استقبال نتائج Mediapipe عند اكتشاف اليد
hands.onResults(onHandsResult);

function onHandsResult(results) {
    // عندما يتم الكشف عن اليد، يتم إظهار رسالة للمستخدم.
    output.innerHTML = '<p>تم اكتشاف يد!</p>';
}

// البدء في استخدام Mediapipe للتفاعل مع الفيديو بعد تشغيل الكاميرا بنجاح
const camera = new Camera(videoElement, {
    onFrame: async () => await hands.send({ image: videoElement }),
});
camera.start();

// أزرار لتفاعل مع الحركات
document.getElementById('btn-detect').addEventListener('click', () => {
    output.innerHTML = '<p>جارِ التعرف على الحركة...</p>';
    setTimeout(() => {
        output.innerHTML = '<p>تم التعرف على الحركة بنجاح!</p>';
    }, 2000);
});

document.getElementById('btn-extract').addEventListener('click', () => {
    output.innerHTML = '<p>جارِ استخراج الحركة...</p>';
    setTimeout(() => {
        output.innerHTML = '<p>تم استخراج الحركة بنجاح.</p>';
    }, 2000);
});

document.getElementById('btn-convert-text').addEventListener('click', () => {
    output.innerHTML = '<p>جارِ تحويل الحركة إلى نص...</p>';
    setTimeout(() => {
        output.innerHTML = '<p>النص العربي: "مرحبًا".</p>';
    }, 2000);
});

document.getElementById('btn-convert-sign').addEventListener('click', () => {
    output.innerHTML = '<p>جارِ تحويل النص إلى فيديو...</p>';
    setTimeout(() => {
        output.innerHTML = '<p>تم إنشاء فيديو للحركات.</p>';
    }, 2000);
});

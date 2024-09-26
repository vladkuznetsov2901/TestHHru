async function getData() {
    try {
        let response = await fetch('https://jjwjw.wiremockapi.cloud/json/hh/test/data_json');

        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }

        let data = await response.json();
        let isChecked = checkData(data);
        console.log(isChecked);

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function checkData(data) {
    data.forEach(customer => {
        const creditHistory = customer.creditHistory;
        let remainingDebtCount = 0;

        for (const element of creditHistory) {
            if (element.type === "Кредитная карта") {
                if (element.currentOverdueDebt > 0) {
                    console.log("Отказано! Причина: задолженность!");
                    return false; // Возврат false при отказе
                }
                if (element.numberOfDaysOnOverdue > 30) {
                    console.log("Отказано! Причина: задолженность более 30 дней!");
                    return false; // Возврат false при отказе
                }
            } else {
                if (element.remainingDebt > 15) remainingDebtCount++;
                if (element.currentOverdueDebt > 0) {
                    console.log("Отказано! Причина: задолженность!");
                    return false; // Возврат false при отказе
                }
                if (element.numberOfDaysOnOverdue > 60) {
                    console.log("Отказано! Причина: задолженность более 60 дней!");
                    return false; // Исправлено на более 60 дней
                }
                if (remainingDebtCount >= 2) {
                    console.log("Отказано! Причина: 2 кредита с задолженностью более 15 дней!");
                    return false; // Возврат false при отказе
                }
            }
        }
    });
    console.log("Одобрено");
    return true; // Возврат true, если все проверки пройдены
}

// Вызов функции
getData();

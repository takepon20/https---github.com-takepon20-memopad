document.addEventListener('DOMContentLoaded', function() {
    const incomeCategories = document.getElementById('income-categories');
    const expenseCategories = document.getElementById('expense-categories');
    const saveButton = document.getElementById('save');
    const history = document.getElementById('history');
  
    // ラジオボタンのイベントリスナー
    document.querySelectorAll('input[name="type"]').forEach(input => {
      input.addEventListener('change', function(event) {
        if (event.target.value === 'income') {
          incomeCategories.style.display = 'block';
          expenseCategories.style.display = 'none';
        } else {
          incomeCategories.style.display = 'none';
          expenseCategories.style.display = 'block';
        }
      });
    });
  
    // セーブボタンのイベントリスナー
    saveButton.addEventListener('click', function() {
      const type = document.querySelector('input[name="type"]:checked').value;
      const category = type === 'income' ? document.getElementById('income-options').value : document.getElementById('expense-options').value;
      const amount = document.getElementById('amount').value;
      const date = new Date().toISOString().split('T')[0];
  
      // 新しいkeyの生成
      let newKey = localStorage.length;
  
      // データの保存
      const data = { date, type, category, amount };
      localStorage.setItem(newKey, JSON.stringify(data));
  
      // 履歴の更新
      updateHistory();
    });
  
    // 履歴の更新関数
    function updateHistory() {
        const incomeHistory = document.getElementById('income-history');
        const expenseHistory = document.getElementById('expense-history');
        incomeHistory.innerHTML = ''; // 収入履歴をクリア
        expenseHistory.innerHTML = ''; // 支出履歴をクリア
      
        Object.keys(localStorage).forEach(key => {
          const entry = JSON.parse(localStorage.getItem(key));
          const entryDiv = document.createElement('div');
          entryDiv.textContent = `日付: ${entry.date}, 項目: ${entry.category}, 金額: ${entry.amount}`;
          
          if (entry.type === 'income') {
            incomeHistory.appendChild(entryDiv);
          } else {
            expenseHistory.appendChild(entryDiv);
          }
        });
      }
      
      // アプリの初期化時に履歴を表示
      updateHistory();
  });
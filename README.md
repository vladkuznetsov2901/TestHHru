# TestHHru

1) ![TestHHRu - public](https://github.com/user-attachments/assets/53f4a5e4-9297-4229-9454-39abb6d63106)
  
2)
   ```sql
   SELECT c.name, SUM(ot.quantity * p.price) AS total_revenue 
   FROM orders o 
   JOIN order_items ot ON o.ord_id = od.ord_id 
   JOIN products p ON ot.ord_id = p.prod_id 
   JOIN categories c ON p.cat_id = c.cat_id 
   WHERE o.status = 'done'
     AND o.order_at >= CURRENT_DATE - INTERVAL '1 year' 
   GROUP BY c.name
   HAVING SUM(ot.quantity * p.price) > 150000
   ORDER BY total_revenue DESC; 
  ```
3) Ссылка на инвалидный oneCompiler(хотя может это и я инвалидный): https://onecompiler.com/html/42tbkcf6s
Данные закинул на wiremock и от туда их уже спарсил. Также, добавил еще пару человек в данные для проверки функции. Проверил данные по всем пунктам из задания и вывел в логи ответы и, в случае отказа, причины отказа.

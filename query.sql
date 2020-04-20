SELECT
  departments.department_id,
  departments.department_name,
  departments.over_head_costs,
  intermediate.product_sales
FROM
  departments
  JOIN (
    SELECT
      departments.department_name,
      Sum(products.product_sales) AS product_sales
    FROM
      products
      JOIN departments ON products.department_name = departments.department_name
    GROUP BY
      departments.department_name
  ) AS intermediate ON departments.department_name = intermediate.department_name
-- Ejercicio SQL
-- Escribir una consulta SQL que traiga todos los clientes que han comprado en total más de 100,000$ en los últimos 12 meses usando las siguientes tablas: 
--Clientes: ID, Nombre, Apellido
--Ventas: Fecha, Sucursal, Numero_factura, Importe, Id_cliente

SELECT c.ID , c.Nombre, c.Apellido, 
SUM ( CASE WHEN v.Fecha BETWEEN DATEADD( month, -12, GETDATE() ) AND GETDATE() THEN v.Importe ) AS Total
FROM Clientes AS c
INNER JOIN Ventas AS v 
ON c.ID = v.Id_cliente
WHERE Total >= 100000
GROUP BY v.Id_cliente;

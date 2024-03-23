SELECT 
	AVG(Price_W_Avg) AS Average_Price
FROM 
	Green_Certificates GC
WHERE 
	GC.Year BETWEEN 2006 AND 2014; 
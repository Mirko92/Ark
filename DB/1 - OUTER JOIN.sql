-- We have 10 records on EMT and 9 in GC. 

-- Example of LEFT OUTER JOIN 
SELECT * FROM Electricity_Market_Trading EMT
	LEFT OUTER JOIN Green_Certificates GC ON GC.Year = EMT.Reference_Period;
    
-- Since we have used LEFT, EMT will be the main table. 
-- The resulting table will display 10 records.
-- As you can see running this query, the rows 2004 and 2005 don't have a match in the GC table. 
-- Therefore, they will have null values on GC columns. 


-- Example of RIGHT OUTER JOIN 
SELECT * FROM Electricity_Market_Trading EMT
	RIGHT OUTER JOIN Green_Certificates GC ON GC.Year = EMT.Reference_Period;
    
-- Since we have used RIGHT, GC will be the main table. 
-- The resulting table will display 9 records with null values where EMT doesn't have a match with GC.

-- Example of FULL OUTER JOIN 
SELECT * FROM Electricity_Market_Trading EMT
	FULL OUTER JOIN Green_Certificates GC ON GC.Year = EMT.Reference_Period;
    
-- EMT table has the records with key 2004;2005; missing in GC.
-- GC table has 2014, which is missing in EMT. 
-- A FULL OUTER JOIN doesn't remove the rows without match, but it'll set the corresponding missing matches to null.
-- To make a long story short, the resulting table will contain 11 elements (GC(9) + 2 missing match on EMT)


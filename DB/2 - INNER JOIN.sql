-- Example of INNER JOIN  
SELECT * from Electricity_Market_Trading EMT
	INNER JOIN Green_Certificates GC on GC.Year = EMT.Reference_Period;

-- We have 10 records on EMT and 9 in GC.
-- In this case, the resulting table will display only 8 records. 
-- The years 2004, 2005, and 2014 are not present in both tables, so they are not included in the final result.

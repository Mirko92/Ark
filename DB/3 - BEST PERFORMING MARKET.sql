-- I don't know if "Best performing market" means the one with the highest or lowest price.
-- So, I've written both queries, one using the MAX operator and the other using MIN. 

SELECT Max(
  ipex, 
  epex_germany, 
  nord_pool, 
  omel, 
  epex_france
) 
FROM Electricity_Market_Trading EMT 
WHERE EMT.Reference_Period = 2007;


SELECT Min(
  ipex, 
  epex_germany, 
  nord_pool, 
  omel, 
  epex_france
) 
FROM Electricity_Market_Trading EMT 
WHERE EMT.Reference_Period = 2007;


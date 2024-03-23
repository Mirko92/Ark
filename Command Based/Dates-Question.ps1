<#
.SYNOPSIS
  Given Year and a Weekday, 
  It will then output the number times that weekday fell on the first of the month
  in the given year

.PARAMETER Year
  Number indicating year 

.PARAMETER Weekday
  Name of the week day ("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")

.EXAMPLE
Example of using the cmdlet.
  Get-WeekDayOccurrences -Year 2000 -WeekDay Monday 
  # Expected Result: 1 

  Use -verbose to get more details during process
  Get-WeekDayOccurrences -Year 2000 -WeekDay Monday -Verbose
#>
function Get-WeekDayOccurrences {
  [CmdletBinding()]
  param (
    [Parameter(Mandatory = $true)]
    [int] $Year,
  
    [Parameter(Mandatory = $true)]
    [ValidateSet(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    )]
    [string] $Weekday
  )

  # Absuntion: 1th Jan 1900 was Monday
  $time0 = 1900; 

  # Map to track week days name and index 
  $weekDays = @{
    0           = "Monday"
    1           = "Tuesday"
    2           = "Wednesday"
    3           = "Thursday"
    4           = "Friday"
    5           = "Saturday"
    6           = "Sunday"
    "Monday"    = 0
    "Tuesday"   = 1
    "Wednesday" = 2
    "Thursday"  = 3
    "Friday"    = 4
    "Saturday"  = 5
    "Sunday"    = 6
  }

  # Count how many leap years are between $time0 and the provided $Year
  $leapYears = 0;
  if ( $Year -gt $time0 ) {
    $leapYears = Get-LeapYears -startYear 1900 -endYear $Year;
  }
  else {
    $leapYears = Get-LeapYears -startYear $Year -endYear 1900;
  }

  Write-Verbose "#$leapYears leap years between $time0 and $Year";

  $diffYears = [Math]::Abs($Year - $time0);
  $diffDays = ($diffYears * 365) + $leapYears;

  Write-Verbose "Days between $time0 and $Year => $diffDays";

  $yearStartingWeekDayId = ($diffDays % 7)
  $yearStartingWeekDayName = $weekDays[$yearStartingWeekDayId];
  Write-Verbose "Provided year starts with: $yearStartingWeekDayName";



  $isCentury = ($Year % 100) -eq 0
  $isLeapYear = (!$isCentury -and (($Year % 4) -eq 0)) -or
              ($isCentury -and (($Year % 400) -eq 0));

  if ($isLeapYear) {
    Write-Verbose "The provided year is a leap year.";
  }
  else {
    Write-Verbose "The provided year is not a leap year.";
  }

  $startDay = 0;
  $months = [ordered]@{
    Jan = $startDay
    Feb = ($startDay += 31)
    Mar = ($startDay += ($isLeapYear ? 29 : 28))
    Apr = ($startDay += 31)
    May = ($startDay += 30)
    Jun = ($startDay += 31)
    Jul = ($startDay += 30)
    Aug = ($startDay += 31)
    Sep = ($startDay += 31)
    Oct = ($startDay += 30)
    Nov = ($startDay += 31)
    Dec = ($startDay += 30)
  }


  $firstDayOfMonthNames = @();
  foreach ($month in $months.GetEnumerator()) {
    $name = $month.Key;
    $start = $month.Value;
    $startWeekDayId = $yearStartingWeekDayId + ($start % 7);
    $startWeekDayName = $($weekDays[$startWeekDayId % 7]);

    Write-Verbose "Month: $name, WeekDay: $startWeekDayName";

    $firstDayOfMonthNames += $startWeekDayName;
  }

  $count = ($firstDayOfMonthNames | Where-Object { $_ -EQ $Weekday }).Count;

  Write-Verbose "WeekDay: $Weekday fell on the first of the month in the given year for $count times";

  return $count;
}


function Get-LeapYears {
  param (
    [Parameter(Mandatory = $true)]
    [int] $startYear,
    [Parameter(Mandatory = $true)]
    [int] $endYear
  )

  $count = 0;

  for ($year = $startYear; $year -lt $endYear; $year++) {
    if ((($year % 4 -eq 0) -and ($year % 100 -ne 0)) -or ($year % 400 -eq 0)) {
      $count++
    }
  }

  return $count; 
}
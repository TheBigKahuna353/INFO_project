# To start Backend
- use AMPPS

# to start Frontend
- `cd car_rental_app`
- `npm start`


# to setup Backend
- `cd car_rental_app`
- `npm install`


[https://mui.com/material-ui/getting-started/usage/]

# TODO
### Home screen
 - simulation data
 - costs and rates
 - car types

### Vehicles screen
 - foreach car, show
   - car properties
   - link to detailed page of vehicle
 - pagination

### HomeModel.php
 ```{ 
    tripsCompleted: 0,
    tripsUpgraded: 0,
    refusedBookings: 0,
    refusedWalkins: 0,
    vehiclesRelocated: 0,
    vehiclesServiced: 0,
 

   vehicleTypes: [
       {
          name: "",
          price: 0
       }
   ]
}
```

### VehiclesModel.php
```
{
   [
      rego: "",
      category: "",
      odometer: "",
      commissioned: 0,
      decommissioned: 0
   ],
   count: 0
}
```
### Vehicle
- rego
- odo
- commisioned
- decommisioned
- trips
- maintaninences
- relocations

### VehicleModel.php
```
{
   rego: "",
   category: "",
   odometer: "",
   commissioned: 0,
   decommissioned: 0,
   trips: [
      {
         start_date: "",
         end_date: "",
         origon: "",
         destination: "",
         distance, ""
      }
   ],
   maintenances: [
      {
         start_date: "",
         end_date: "",
         location: "",
         mileage: ""
      }
   ],
   relocations: [
      {
         start_date: "",
         end_date: "",
         origon: "",
         destination: "",
         distance, ""
      }
   ]
}
```

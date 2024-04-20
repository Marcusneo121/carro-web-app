
![Logo](https://i.ibb.co/wN4LCJb/carros.png)


# Carro Web App

Carro is a P2P Car Sharing Platform. This platform consist of Web and Mobile version. This repo is the web app developed in Next.js. Backend API is in another repo (link to repo attached below), developed with Node.js (Adonis.js).


## Technologies

<img src="https://i.pinimg.com/736x/4a/2b/e7/4a2be73b1e2efb44355436c40bf496dd.jpg" width="150"/> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" width="90"/> <img src="https://getlogovector.com/wp-content/uploads/2021/01/tailwind-css-logo-vector.png" width="150"/> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9xHgN7BktDc0evlFpxKnLi-LOfGvqEqfWpSWgC7M8&s" width="150"/> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" width="150"/> <img src="https://logowik.com/content/uploads/images/vercel1868.jpg" width="150"/>


## Features

Some pretty basic feature, mainly focus on backend. This is just a showcase.

- Login, Sign Up & Logout with JWT Authentication 
- Host Car
- Guest Book Car
- Payment with Stripe (custom backend api integrated with Stripe)
- Car, Booking(for Guest) and Rent Request(for Host) Listing
- Bargain car renting price (between Host & Guest)

## Screenshots

Home | Car List
--- | ---
<img src="https://i.postimg.cc/CxqBK3fk/Carro.jpg" height="550"/> | <img src="https://i.postimg.cc/6Qz96czC/Carro-12-40pm-04-20.jpg" height="550"/>

Car Detail | Payment (Stripe)
--- | ---
<img src="https://i.postimg.cc/43KgZG7R/Carro-12-41pm-04-20.jpg" height="550"/> | <img src="https://i.postimg.cc/0j6nh36J/Carro-2-38pm-04-20.jpg" height="550"/>

   



## State Management & Architecture
**Provider + ChangeNotifier (with Custom ViewState)**

- ViewStateModel with ChangeNotifier
```
//Example of a state
//Detail code in "lib/core/provider/view_state_model.dart"

class ViewStateModel with ChangeNotifier {
    ViewState _viewState = ViewState.idle;

    set viewState(ViewState viewState) {
        _viewState = viewState;
        notifyListeners();
    }

    bool get isBusy => viewState == ViewState.busy;

    void setBusy() => viewState = ViewState.busy;
}
```


- Use, Implementation & Extending
```
class DemoProvider extends ViewStateModel {
  DemoProvider() {
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await callAPI();
    });
  }

  callAPI() async {
    setBusy();
    try {
      setIdle();
    } catch (e, s) {
      setError(e, s);
    }
  }
}
```

- UI Layer Implementation
```
class DemoPage extends StatefulWidget {
    Widget build(BuildContext context) {
        return ChangeNotifierProvider(
            create: (context) => DemoProvider(),
            child: Scaffold(
                builder: (context, model, child) {
                    if (viewCarModel.isBusy) {
                        return CircularProgressIndicator();
                    } else if (viewCarModel.isError){
                        return Error();w
                    } else if (viewCarModel.isIdle){
                        //Idle is when API calling done
                        return Listing();
                    }
                }
            ),
        );
    }
}
```

**You might ask why not use BLOC?**

The reason I use Provider is that I want to keep the project simple to manage, and I don't like how BLOC need to manage 3 files (bloc, event, state). However with BLOC it did the same thing as my ViewState approach. One thing I like with BLOC that it is complicated to setup at first but the implementation in UI layer and features are much more easier, based on my past project experience.

## Build & Run
To build & run this Flutter project : 

```bash
  flutter pub get
  flutter run
```

## Related
[Carro Web-App Repo - Next JS](https://github.com/Marcusneo121/carro-web-app)

[Carro Backend Repo - Node JS](https://github.com/Marcusneo121/carro-backend)


## Contributor

- [@Marcusneo121](https://github.com/Marcusneo121)


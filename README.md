# React Simple Maps for Framer

Create beautiful SVG maps in Framer based on [React Simple Maps](https://www.react-simple-maps.io)

## Customising the Map

The map can be configured, via a JSON file, to display specific countries using a set of custom colours. In the JSON file, countries are referenced using a [three-letter code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3). The default, hover and active colours for each listed country are defined using CSS colour values. It's only necessary to provide colours for the states you want to customise. Here's an example:


```
[
    { "ISO_A3": "GBR", "default": "blue", "hover": "green", "active": "orange" },
    { "ISO_A3": "ESP", "default": "rgb(255, 0, 153, 10%)", "hover": "#F09" },
    { "ISO_A3": "ITA", "active": "#000080" }
]
```

## Handling Interactions

When you click on a country, you can trigger a transition by adding an interaction in the properties panel. You can also handle the click using an override, and access information about the clicked country. Here's an example:

```
import { Override } from "framer"

export function ClickCountry(): Override {
    return {
        onClick: (geoProps) => {
            console.log(geoProps)
        },
    }
}

// Example geoProps object:
// 
// {
//     NAME: "Algeria",
//     NAME_LONG: "Algeria",
//     ABBREV: "Alg.",
//     FORMAL_EN: "People's Democratic Republic of Algeria",
//     POP_EST: 40969443,
//     POP_RANK: 15,
//     GDP_MD_EST: 609400,
//     POP_YEAR: 2017,
//     GDP_YEAR: 2016,
//     ISO_A2: "DZ",
//     ISO_A3: "DZA",
//     CONTINENT: "Africa",
//     REGION_UN: "Africa",
//     SUBREGION: "Northern Africa",
// }
```

## Change Log

- **1.0.0** — Initial release
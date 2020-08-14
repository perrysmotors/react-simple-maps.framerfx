import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import { indentTitle } from "./lib/indentTitle"

import {
    ComposableMap,
    ZoomableGroup,
    Graticule,
    Sphere,
    Geographies,
    Geography,
} from "react-simple-maps"

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export function SimpleMap({
    projection,
    defaultFill,
    defaultColor,
    hoverFill,
    sphereFill,
    sphereColor,
    graticuleColor,
}) {
    // const [content, setContent] = React.useState("")
    return (
        <ComposableMap
            data-tip=""
            projection={projection}
            projectionConfig={{ scale: 200 }}
        >
            <ZoomableGroup>
                <Sphere
                    fill={sphereFill}
                    stroke={sphereColor}
                    strokeWidth={2}
                />
                <Graticule
                    stroke={graticuleColor}
                    clipPath="url(#rsm-sphere)"
                />
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                //   onMouseEnter={() => {
                                //     const { NAME, POP_EST } = geo.properties;
                                //     setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                                //   }}
                                //   onMouseLeave={() => {
                                //     setTooltipContent("");
                                //   }}
                                style={{
                                    default: {
                                        fill: defaultFill,
                                        stroke: defaultColor,
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: hoverFill,
                                        outline: "none",
                                    },
                                    pressed: {
                                        fill: hoverFill,
                                        outline: "none",
                                    },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}

SimpleMap.defaultProps = {
    height: 600,
    width: 800,
    projection: "geoEqualEarth",
    defaultFill: "#D6D6DA",
    defaultColor: "transparent",
    hoverFill: "#F53",
    sphereFill: "transparent",
    sphereColor: "#FF5533",
    graticuleColor: "#DDD",
}

addPropertyControls(SimpleMap, {
    projection: {
        title: "Projection",
        type: ControlType.Enum,
        options: [
            "geoAlbers",
            "geoAzimuthalEqualArea",
            "geoAzimuthalEquidistant",
            "geoConicConformal",
            "geoConicEqualArea",
            "geoConicEquidistant",
            "geoEqualEarth",
            "geoEquirectangular",
            "geoGnomonic",
            "geoMercator",
            "geoNaturalEarth1",
            "geoOrthographic",
            "geoStereographic",
            "geoTransverseMercator",
        ],
        optionTitles: [
            "Albers",
            "Azimuthal Equal Area",
            "Azimuthal Equidistant",
            "Conic Conformal",
            "Conic Equal Area",
            "Conic Equidistant",
            "Equal Earth",
            "Equirectangular",
            "Gnomonic",
            "Mercator",
            "Natural Earth",
            "Orthographic",
            "Stereographic",
            "Transverse Mercator",
        ],
        defaultValue: SimpleMap.defaultProps.projection,
    },
    defaultFill: {
        title: "Fill",
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.defaultFill,
    },
    defaultColor: {
        title: indentTitle("Stroke"),
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.defaultColor,
    },
    hoverFill: {
        title: indentTitle("Hover"),
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.hoverFill,
    },
    sphereFill: {
        title: "Sphere",
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.sphereFill,
    },
    sphereColor: {
        title: indentTitle("Outline"),
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.sphereColor,
    },
    graticuleColor: {
        title: "Graticule",
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.graticuleColor,
    },
    // onTap: {
    //     type: ControlType.EventHandler,
    // },
})

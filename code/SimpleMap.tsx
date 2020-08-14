import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

import { indentTitle } from "./lib/indentTitle"

import ReactTooltip from "react-tooltip"
import {
    ComposableMap,
    ZoomableGroup,
    Graticule,
    Sphere,
    Geographies,
    Geography,
} from "react-simple-maps"
// import { geoCentroid } from "d3-geo"

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export function SimpleMap({
    projection,
    defaultFill,
    hoverFill,
    activeFill,
    strokeColor,
    sphereFill,
    sphereColor,
    graticuleColor,
    zoom,
    minZoom,
    maxZoom,
    onClick,
}) {
    const [active, setActive] = React.useState("")
    const [hovered, setHovered] = React.useState("")
    return (
        <div>
            <ComposableMap
                data-tip=""
                projection={projection}
                projectionConfig={{ scale: 200 }}
            >
                <ZoomableGroup zoom={zoom} minZoom={minZoom} maxZoom={maxZoom}>
                    <Sphere
                        fill={sphereFill}
                        stroke={sphereColor}
                        strokeWidth={2}
                    />
                    <Graticule
                        stroke={graticuleColor}
                        strokeWidth={0.5}
                        clipPath="url(#rsm-sphere)"
                    />
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => (
                            <>
                                {geographies.map((geo) => {
                                    const { NAME, ISO_A3 } = geo.properties
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() =>
                                                setHovered(NAME)
                                            }
                                            onMouseLeave={() => setHovered("")}
                                            onClick={() => {
                                                setActive(
                                                    active === ISO_A3
                                                        ? ""
                                                        : ISO_A3
                                                )
                                                onClick &
                                                    onClick(geo.properties)
                                            }}
                                            style={{
                                                default: {
                                                    fill:
                                                        active === ISO_A3
                                                            ? activeFill
                                                            : defaultFill,
                                                    stroke: strokeColor,
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill:
                                                        active === ISO_A3
                                                            ? activeFill
                                                            : hoverFill,
                                                    stroke: strokeColor,
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                                pressed: {
                                                    fill: activeFill,
                                                    stroke: strokeColor,
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                            }}
                                        />
                                    )
                                })}
                            </>
                        )}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip>{hovered}</ReactTooltip>
        </div>
    )
}

SimpleMap.defaultProps = {
    height: 600,
    width: 800,
    projection: "geoEqualEarth",
    defaultFill: "#D6D6DA",
    hoverFill: "#F53",
    activeFill: "#D6D6DA",
    strokeColor: "transparent",
    sphereFill: "transparent",
    sphereColor: "#FF5533",
    graticuleColor: "#DDD",
    zoom: 1,
    minZoom: 1,
    maxZoom: 8,
    onClick: () => null,
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
        title: "Countries",
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.defaultFill,
    },
    hoverFill: {
        title: indentTitle("Hover"),
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.hoverFill,
    },
    activeFill: {
        title: indentTitle("Active"),
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.hoverFill,
    },
    strokeColor: {
        title: indentTitle("Outline"),
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.strokeColor,
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
    zoom: {
        title: "Zoom",
        type: ControlType.Number,
        defaultValue: 1,
        min: 0.1,
        max: 50,
    },
    minZoom: {
        title: indentTitle("Min"),
        type: ControlType.Number,
        defaultValue: 1,
        min: 0.1,
        max: 50,
    },
    maxZoom: {
        title: indentTitle("Max"),
        type: ControlType.Number,
        defaultValue: 8,
        min: 0.1,
        max: 50,
    },
    // onTap: {
    //     type: ControlType.EventHandler,
    // },
})

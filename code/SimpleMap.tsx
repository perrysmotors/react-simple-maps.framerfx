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

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export function SimpleMap({
    width,
    height,
    projection,
    defaultFill,
    hoverFill,
    activeFill,
    strokeColor,
    sphereFill,
    sphereColor,
    graticuleType,
    graticuleColor,
    zoom,
    minZoom,
    maxZoom,
    hasTooltip,
    configFile,
    onClickCountry,
}) {
    const [active, setActive] = React.useState("")
    const [hovered, setHovered] = React.useState("")
    const [config, setConfig] = React.useState([])

    React.useEffect(() => {
        const setConfigFromFile = async (url) => {
            try {
                const response = await fetch(url)
                setConfig(await response.json())
            } catch (err) {
                setConfig([])
            }
        }
        if (configFile) {
            setConfigFromFile(configFile)
        } else {
            setConfig([])
        }
    }, [configFile])

    const graticule = (
        <Graticule
            stroke={graticuleColor}
            fill={"none"}
            strokeWidth={0.5}
            clipPath="url(#rsm-sphere)"
        />
    )

    return (
        <div>
            <ComposableMap
                data-tip=""
                projection={projection}
                width={width}
                height={height}
            >
                <ZoomableGroup zoom={zoom} minZoom={minZoom} maxZoom={maxZoom}>
                    <Sphere
                        fill={sphereFill}
                        stroke={sphereColor}
                        strokeWidth={2}
                    />
                    {graticuleType === "Under" ? graticule : null}
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => (
                            <>
                                {geographies.map((geo) => {
                                    const { NAME, ISO_A3 } = geo.properties
                                    const custom = config.find(
                                        (item) => item.ISO_A3 === ISO_A3
                                    )
                                    const geographyDefaultFill =
                                        custom && custom.default
                                            ? custom.default
                                            : defaultFill
                                    const geographyHoverFill =
                                        custom && custom.hover
                                            ? custom.hover
                                            : hoverFill
                                    const geographyActiveFill =
                                        custom && custom.active
                                            ? custom.active
                                            : activeFill
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
                                                onClickCountry &&
                                                    onClickCountry(
                                                        geo.properties
                                                    )
                                            }}
                                            style={{
                                                default: {
                                                    fill:
                                                        active === ISO_A3
                                                            ? geographyActiveFill
                                                            : geographyDefaultFill,
                                                    stroke: strokeColor,
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill:
                                                        active === ISO_A3
                                                            ? geographyActiveFill
                                                            : geographyHoverFill,
                                                    stroke: strokeColor,
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                                pressed: {
                                                    fill: geographyActiveFill,
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
                    {graticuleType === "Over" ? graticule : null}
                </ZoomableGroup>
            </ComposableMap>
            {hasTooltip ? <ReactTooltip>{hovered}</ReactTooltip> : null}
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
    graticuleType: "Over",
    graticuleColor: "#DDD",
    zoom: 1,
    minZoom: 1,
    maxZoom: 8,
    hasTooltip: true,
    configFile: null,
    onClickCountry: () => null,
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
    graticuleType: {
        title: "Graticule",
        type: ControlType.Enum,
        options: ["Over", "Under", "None"],
        displaySegmentedControl: true,
    },
    graticuleColor: {
        title: indentTitle("Colour"),
        type: ControlType.Color,
        defaultValue: SimpleMap.defaultProps.graticuleColor,
        hidden: ({ graticuleType }) => graticuleType === "None",
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
    hasTooltip: {
        title: "Tooltip",
        type: ControlType.Boolean,
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    configFile: {
        title: "Customise",
        type: ControlType.File,
        allowedFileTypes: ["json"],
    },
    onClickCountry: {
        type: ControlType.EventHandler,
    },
})

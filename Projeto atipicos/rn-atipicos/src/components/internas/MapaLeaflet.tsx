import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { colors } from "@/theme/colors";

// Mapa real com OpenStreetMap via Leaflet, embutido num WebView.
// Não exige chave de API. Os tiles precisam de internet para carregar.
export default function MapaLeaflet({
  lat,
  lng,
  label = "Localização",
  height = 220,
}: {
  lat: number;
  lng: number;
  label?: string;
  height?: number;
}) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>html,body,#map{margin:0;padding:0;height:100%;width:100%;background:#e8e4dc}</style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    var map = L.map('map', { zoomControl: true, attributionControl: true }).setView([${lat}, ${lng}], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([${lat}, ${lng}]).addTo(map).bindPopup(${JSON.stringify(label)}).openPopup();
  </script>
</body>
</html>`;

  return (
    <View style={[styles.wrap, { height }]}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={styles.web}
        scrollEnabled={false}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 6, overflow: "hidden", backgroundColor: colors.mapGrid },
  web: { flex: 1, backgroundColor: colors.mapGrid },
});

import Packet from '#jagex2/io/Packet.js';

class Metadata {
    vertexCount = 0;
    faceCount = 0;
    texturedFaceCount = 0;
    vertexFlagsOffset = 0;
    vertexXOffset = 0;
    vertexYOffset = 0;
    vertexZOffset = 0;
    vertexLabelsOffset = 0;
    faceVerticesOffset = 0;
    faceOrientationsOffset = 0;
    faceColorsOffset = 0;
    faceInfosOffset = 0;
    facePrioritiesOffset = 0;
    faceAlphasOffset = 0;
    faceLabelsOffset = 0;
    faceTextureAxisOffset = 0;
}

export default class Model {
    static order = [];
    static metadata = [];

    static head;
    static face1;
    static face2;
    static face3;
    static face4;
    static face5;
    static point1;
    static point2;
    static point3;
    static point4;
    static point5;
    static vertex1;
    static vertex2;
    static axis;

    static unpack(models) {
        let head = models.read('ob_head.dat');
        let face1 = models.read('ob_face1.dat');
        let face2 = models.read('ob_face2.dat');
        let face3 = models.read('ob_face3.dat');
        let face4 = models.read('ob_face4.dat');
        let face5 = models.read('ob_face5.dat');
        let point1 = models.read('ob_point1.dat');
        let point2 = models.read('ob_point2.dat');
        let point3 = models.read('ob_point3.dat');
        let point4 = models.read('ob_point4.dat');
        let point5 = models.read('ob_point5.dat');
        let vertex1 = models.read('ob_vertex1.dat');
        let vertex2 = models.read('ob_vertex2.dat');
        let axis = models.read('ob_axis.dat');

        let faceTextureAxisOffset = 0;
        let vertexLabelsOffset = 0;
        let faceColorsOffset = 0;
        let faceInfosOffset = 0;
        let facePrioritiesOffset = 0;
        let faceAlphasOffset = 0;
        let faceLabelsOffset = 0;

        let total = head.g2();
        for (let i = 0; i < total; i++) {
            let id = head.g2();
            Model.order.push(id);

            let meta = new Metadata();
            meta.vertexCount = head.g2();
            meta.faceCount = head.g2();
            meta.texturedFaceCount = head.g1();

            meta.vertexFlagsOffset = point1.pos;
            meta.vertexXOffset = point2.pos;
            meta.vertexYOffset = point3.pos;
            meta.vertexZOffset = point4.pos;
            meta.faceVerticesOffset = vertex1.pos;
            meta.faceOrientationsOffset = vertex2.pos;

            let hasInfo = head.g1();
            let hasPriorities = head.g1();
            let hasAlpha = head.g1();
            let hasFaceLabels = head.g1();
            let hasVertexLabels = head.g1();
            meta.hasInfo = hasInfo;
            meta.hasPriorities = hasPriorities;
            meta.hasAlpha = hasAlpha;
            meta.hasFaceLabels = hasFaceLabels;
            meta.hasVertexLabels = hasVertexLabels;

            for (let v = 0; v < meta.vertexCount; v++) {
                let flags = point1.g1();

                if ((flags & 0x1) != 0) {
                    point2.gsmarts();
                }

                if ((flags & 0x2) != 0) {
                    point3.gsmarts();
                }

                if ((flags & 0x4) != 0) {
                    point4.gsmarts();
                }
            }

            for (let f = 0; f < meta.faceCount; f++) {
                let type = vertex2.g1();

                if (type === 1) {
                    vertex1.gsmarts();
                    vertex1.gsmarts();
                }

                vertex1.gsmarts();
            }

            meta.faceColorsOffset = faceColorsOffset;
            faceColorsOffset += meta.faceCount * 2;

            if (hasInfo == 1) {
                meta.faceInfosOffset = faceInfosOffset;
                faceInfosOffset += meta.faceCount;
            }

            if (hasPriorities == 255) {
                meta.facePrioritiesOffset = facePrioritiesOffset;
                facePrioritiesOffset += meta.faceCount;
            } else {
                meta.facePrioritiesOffset = -hasPriorities - 1;
            }

            if (hasAlpha == 1) {
                meta.faceAlphasOffset = faceAlphasOffset;
                faceAlphasOffset += meta.faceCount;
            }

            if (hasFaceLabels == 1) {
                meta.faceLabelsOffset = faceLabelsOffset;
                faceLabelsOffset += meta.faceCount;
            }

            if (hasVertexLabels == 1) {
                meta.vertexLabelsOffset = vertexLabelsOffset;
                vertexLabelsOffset += meta.vertexCount;
            }

            meta.faceTextureAxisOffset = faceTextureAxisOffset;
            faceTextureAxisOffset += meta.texturedFaceCount;

            Model.metadata[id] = meta;
        }

        Model.head = head;
        Model.face1 = face1;
        Model.face2 = face2;
        Model.face3 = face3;
        Model.face4 = face4;
        Model.face5 = face5;
        Model.point1 = point1;
        Model.point2 = point2;
        Model.point3 = point3;
        Model.point4 = point4;
        Model.point5 = point5;
        Model.vertex1 = vertex1;
        Model.vertex2 = vertex2;
        Model.axis = axis;
    }

    static get(id) {
        let meta = Model.metadata[id];
        if (!meta) {
            return null;
        }

        let model = new Model();
        model.id = id;
        model.meta = meta;
        model.vertexCount = meta.vertexCount;
        model.faceCount = meta.faceCount;
        model.texturedFaceCount = meta.texturedFaceCount;
        model.vertexX = [];
        model.vertexY = [];
        model.vertexZ = [];
        model.faceVertexA = [];
        model.faceVertexB = [];
        model.faceVertexC = [];
        model.texturedVertexA = [];
        model.texturedVertexB = [];
        model.texturedVertexC = [];

        if (meta.vertexLabelsOffset >= 0) {
            model.vertexLabel = [];
        }

        if (meta.faceInfosOffset  >= 0) {
            model.faceInfo = [];
        }

        if (meta.facePrioritiesOffset >= 0) {
            model.facePriority = [];
        } else {
            model.priority = -meta.facePrioritiesOffset - 1;
        }

        if (meta.faceAlphasOffset >= 0) {
            model.faceAlpha = [];
        }

        if (meta.faceLabelsOffset >= 0) {
            model.faceLabel = [];
        }

        model.faceColor = [];

        Model.point1.pos = meta.vertexFlagsOffset;
        Model.point2.pos = meta.vertexXOffset;
        Model.point3.pos = meta.vertexYOffset;
        Model.point4.pos = meta.vertexZOffset;
        Model.vertex1.pos = meta.faceVerticesOffset;

        let x = 0;
        let y = 0;
        let z = 0;

        let startX = Model.point2.pos;
        let startY = Model.point3.pos;
        let startZ = Model.point4.pos;
        for (let v = 0; v < meta.vertexCount; v++) {
            let flags = Model.point1.g1();
            let x0 = 0;
            let y0 = 0;
            let z0 = 0;

            if ((flags & 0x1) != 0) {
                x0 = Model.point2.gsmarts();
            }

            if ((flags & 0x2) != 0) {
                y0 = Model.point3.gsmarts();
            }

            if ((flags & 0x4) != 0) {
                z0 = Model.point4.gsmarts();
            }

            model.vertexX[v] = x + x0;
            model.vertexY[v] = y + y0;
            model.vertexZ[v] = z + z0;

            x = model.vertexX[v];
            y = model.vertexY[v];
            z = model.vertexZ[v];

            if (model.vertexLabel) {
                model.vertexLabel[v] = Model.point5.g1();
            }
        }
        let endX = Model.point2.pos;
        let endY = Model.point3.pos;
        let endZ = Model.point4.pos;
        model.rawVertexFlags = Model.point1.gdata(meta.vertexCount, meta.vertexFlagsOffset, false);
        model.rawVertexX = Model.point2.gdata(endX - startX, startX, false);
        model.rawVertexY = Model.point3.gdata(endY - startY, startY, false);
        model.rawVertexZ = Model.point4.gdata(endZ - startZ, startZ, false);
        if (model.vertexLabel) {
            model.rawVertexLabel = Model.point5.gdata(meta.vertexCount, meta.vertexLabelsOffset, false);
        }

        Model.face1.pos = meta.faceColorsOffset;
        Model.face2.pos = meta.faceInfosOffset;
        Model.face3.pos = meta.facePrioritiesOffset;
        Model.face4.pos = meta.faceAlphasOffset;
        Model.face5.pos = meta.faceLabelsOffset;

        for (let f = 0; f < meta.faceCount; f++) {
            model.faceColor[f] = Model.face1.g2();

            if (model.faceInfo) {
                model.faceInfo[f] = Model.face2.g1();
            }

            if (model.facePriority) {
                model.facePriority[f] = Model.face3.g1();
            }

            if (model.faceAlpha) {
                model.faceAlpha[f] = Model.face4.g1();
            }

            if (model.faceLabel) {
                model.faceLabel[f] = Model.face5.g1();
            }
        }
        model.rawFaceColor = Model.face1.gdata(meta.faceCount * 2, meta.faceColorsOffset, false);

        if (meta.hasInfo == 1) {
            model.rawFaceInfo = Model.face2.gdata(meta.faceCount, meta.faceInfosOffset, false);
        }

        if (meta.hasPriorities == 255) {
            model.rawFacePriority = Model.face3.gdata(meta.faceCount, meta.facePrioritiesOffset, false);
        }

        if (meta.hasAlpha == 1) {
            model.rawFaceAlpha = Model.face4.gdata(meta.faceCount, meta.faceAlphasOffset, false);
        }

        if (meta.hasFaceLabels == 1) {
            model.rawFaceLabel = Model.face5.gdata(meta.faceCount, meta.faceLabelsOffset, false);
        }

        Model.vertex1.pos = meta.faceVerticesOffset;
        Model.vertex2.pos = meta.faceOrientationsOffset;

        let a = 0;
        let b = 0;
        let c = 0;
        let last = 0;

        let startFaceVertices = Model.vertex1.pos;
        let startFaceOrientations = Model.vertex2.pos;
        for (let f = 0; f < meta.faceCount; f++) {
            let type = Model.vertex2.g1();

            if (type === 1) {
                a = Model.vertex1.gsmarts() + last;
                last = a;

                b = Model.vertex1.gsmarts() + last;
                last = b;
            } else if (type === 2) {
                b = c;
            } else if (type === 3) {
                a = c;
            } else if (type === 4) {
                let b0 = a;
                a = b;
                b = b0;
            }

            c = Model.vertex1.gsmarts() + last;
            last = c;

            model.faceVertexA[f] = a;
            model.faceVertexB[f] = b;
            model.faceVertexC[f] = c;
        }
        let endFaceVertices = Model.vertex1.pos;
        let endFaceOrientations = Model.vertex2.pos;
        model.rawFaceVertex = Model.vertex1.gdata(endFaceVertices - startFaceVertices, startFaceVertices, false);
        model.rawFaceOrientation = Model.vertex2.gdata(endFaceOrientations - startFaceOrientations, startFaceOrientations, false);

        Model.axis.pos = meta.faceTextureAxisOffset * 6;
        for (let t = 0; t < meta.texturedFaceCount; t++) {
            model.texturedVertexA[t] = Model.axis.g2();
            model.texturedVertexB[t] = Model.axis.g2();
            model.texturedVertexC[t] = Model.axis.g2();
        }
        model.rawTexturedVertex = Model.axis.gdata(meta.texturedFaceCount * 6, meta.faceTextureAxisOffset * 6, false);

        return model;
    }

    // using 234+ format because it's suitable to be separate files and has tooling
    convert() {
        let data = new Packet();

        data.pdata(this.rawVertexFlags);
        data.pdata(this.rawFaceOrientation);

        if (this.meta.hasPriorities == 255) {
            data.pdata(this.rawFacePriority);
        }

        if (this.meta.hasFaceLabels == 1) {
            data.pdata(this.rawFaceLabel);
        }

        if (this.meta.hasInfo == 1) {
            data.pdata(this.rawFaceInfo);
        }

        if (this.meta.hasVertexLabels == 1) {
            data.pdata(this.rawVertexLabel);
        }

        if (this.meta.hasAlpha == 1) {
            data.pdata(this.rawFaceAlpha);
        }

        data.pdata(this.rawFaceVertex);
        data.pdata(this.rawFaceColor);
        data.pdata(this.rawTexturedVertex);
        data.pdata(this.rawVertexX);
        data.pdata(this.rawVertexY);
        data.pdata(this.rawVertexZ);

        // header:
        data.p2(this.meta.vertexCount);
        data.p2(this.meta.faceCount);
        data.p1(this.meta.texturedFaceCount);

        data.p1(this.meta.hasInfo);
        data.p1(this.meta.hasPriorities);
        data.p1(this.meta.hasAlpha);
        data.p1(this.meta.hasFaceLabels);
        data.p1(this.meta.hasVertexLabels);

        data.p2(this.rawVertexX.length);
        data.p2(this.rawVertexY.length);
        data.p2(this.rawVertexZ.length);
        data.p2(this.rawFaceVertex.length);
        return data;
    }
}

struct VertexInput {
    @location(0) position: vec4f
}

struct VertexOutput {
    @builtin(position) position: vec4f
}

@vertex
fn vertex(in:VertexInput) -> VertexOutput {
    var out: VertexOutput;
    out.position = in.position;

    return out;
}

@fragment
fn fragment(in: VertexOutput) -> @location(0) vec4f {
    return vec4(1.0, 0.0, 0.0, 0.0);
}

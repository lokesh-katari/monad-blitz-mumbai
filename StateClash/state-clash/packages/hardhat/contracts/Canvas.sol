// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

/**
 * @title Canvas
 * @notice A collaborative 100x100 pixel canvas that demonstrates Monad's
 *         Optimistic Parallel EVM by detecting same-block state collisions.
 */
contract Canvas {
    struct Pixel {
        uint8 color;
        uint256 lastUpdateBlock;
    }

    /// @notice 1D mapping representing the 100x100 grid. pixelId = x*100 + y
    mapping(uint256 => Pixel) public canvas;

    /// @notice Emitted when a pixel is drawn with no same-block contention.
    event PixelUpdated(uint256 indexed pixelId, uint8 color);

    /// @notice Emitted when two transactions touch the same pixel in one block.
    event StateCollision(uint256 indexed pixelId, uint256 blockNumber);

    /**
     * @notice Paint a pixel on the canvas.
     * @param _x X coordinate (0-99)
     * @param _y Y coordinate (0-99)
     * @param _color Color index (0-255)
     */
    function drawPixel(uint256 _x, uint256 _y, uint8 _color) external {
        require(_x < 100, "X out of bounds");
        require(_y < 100, "Y out of bounds");

        uint256 pixelId = (_x * 100) + _y;

        if (canvas[pixelId].lastUpdateBlock == block.number) {
            emit StateCollision(pixelId, block.number);
        } else {
            emit PixelUpdated(pixelId, _color);
        }

        canvas[pixelId].color = _color;
        canvas[pixelId].lastUpdateBlock = block.number;
    }
}
